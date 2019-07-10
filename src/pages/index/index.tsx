import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import styles from './index.scss'
import logoImg from '@/static/images/logo.png'
import wxImg from '@/static/images/icon-wx.png'
import { loginService } from '@/services/login'
import { ResponseSuccess } from '@/models/response'
import { setToken } from '@/utils/token'
import { connect } from '@tarojs/redux'
import { setUserAction } from '@/actions/user'
import { TOKEN_KEY, USER_KEY } from '@/models/key'
import { UserModel } from '@/models/user'
import { error_log } from '@/utils/log';

// store里的数据
type PageStateProps = {
  userState: UserModel
}
// store里的方法
type PageDispatchProps = {
  dispatchUser: (user) => void
}
// 父子组件传递的props
type PageOwnProps = {}
// 自己的data
type PageState = {
  isAuthorized: boolean
}

type IProps = PageStateProps & PageOwnProps & PageDispatchProps

interface Index {
  props: IProps
  state: PageState
}

const mapStateToProps = (state, ownProps) => {
  return {
    userState: state.user
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchUser (user) {
      dispatch(setUserAction(user))
    }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class Index extends Component {
  config: Config = {
    navigationBarTitleText: 'xxx车服'
  }
  
  constructor (props) {
    super(props)
    this.state = {
      isAuthorized: true
    }
  }

  token = Taro.getStorageSync(TOKEN_KEY)
  user = Taro.getStorageSync(USER_KEY)

  async componentWillMount () {
    try {
      // 403 token过期等 强制刷新 重头开始
      if (this.$router.params.force) {
        this.getWeappCode()
      } else {
        const res = await Taro.checkSession()
        if (res.errMsg === 'checkSession:ok' && this.computedDirectToIndex) {
          // storage 有缓存
          this.userInfo(this.user)
        } else {
          // storage无缓存
          this.getWeappCode()
        }
      }
    } catch (e) {
      error_log(e)
      // 检查失败重头开始
      this.getWeappCode()
    }
  }

  // 是否有token，有说明已经登陆
  get computedDirectToIndex () {
    try {      
      return this.token && this.user
    } catch (e) {
      error_log(e)
      return false
    }
  }
  
  // 微信登录获取code
  getWeappCode () {
    Taro.login().then((res) => {
      this.weappLogin(res.code)
    })
  }

  // 使用小程序code登录
  loginService = new loginService()
  async weappLogin (code: string) {
    Taro.showLoading()
    try {
      const res = await this.loginService.doWeappLogin(code)
      if (res.data.code === ResponseSuccess) {
        const resData = res.data.data
        setToken(resData.weappAccessToken)
        this.userInfo(resData.loginUser)
      }
    } catch (e) {
      error_log(e)
    }
    Taro.hideLoading()
  }

  // 用户授权
  onGetUserInfo (e) {
    console.log(e)
    if (e.detail.errMsg === 'getUserInfo:ok') {
      this.getWeappCode()
    }
  }

  // 获取用户信息，判断是否授权
  userInfo(loginUser) {
    Taro.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN'
    }).then((res) => {
      this.props.dispatchUser(Object.assign({}, res.userInfo, loginUser))
      Taro.setStorageSync(USER_KEY, Object.assign({}, res.userInfo, loginUser))
      this.decrypt(res.encryptedData, res.iv)
      Taro.reLaunch({
        url: '/pages/user/index'
      })
    }).catch((err) => {
      error_log(err)
      this.setState({
        isAuthorized: false
      })
    })
  }

  // 解密后台获取unionId
  async decrypt (encryptedData: string, iv: string) {
    Taro.showLoading()
    try {
      const res = await this.loginService.doDecrypt(encryptedData, iv)
      if (res.data.code === ResponseSuccess) {}
    } catch (e) {
      error_log(e)
    }
    Taro.hideLoading()
  }

  render () {
    return (
      <View>
      {!this.state.isAuthorized && 
        <View className={styles.wrap_login}>
          <Image src={logoImg} className={styles.img_logo}></Image>
          <View className={styles.title}>xxx车服</View>
          <View className={styles.subtitle}>一站式车主养车平台</View>
          <View className={styles.tip}>一键开启便捷车生活</View>
          <Button openType='getUserInfo' onGetUserInfo={this.onGetUserInfo} className={styles.btn_login}>
            <Image src={wxImg} className={styles.img_wx}></Image>
            <Text className={styles.text}>微信登录</Text>
          </Button>
        </View>
      }
      </View>
    )
  }
}

  // #region 导出注意 
  // 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性  
  // 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
  // #endregion
export default Index as ComponentClass<PageOwnProps, PageState>