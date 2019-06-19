import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import styles from './index.scss'
import logoImg from '@/static/images/logo.png'
import wxImg from '@/static/images/icon-wx.png'
import { loginService } from '@/services/login'
import { ResponseSuccess } from '@/models/response'
import { setToken } from '@/utils/token'

// store里的数据
type PageStateProps = {}
// store里的方法
type PageDispatchProps = {}
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
  
  componentDidMount () {
    // 这里写初始化方法
    this.weappLogin('1')
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
    } catch (e) {}
    Taro.hideLoading()
  }

  // 获取用户信息，判断是否授权
  userInfo(loginUser) {
    Taro.getUserInfo({
      withCredentials: true
    }).then((e) => {
      console.log(e)
      console.log(loginUser)
      // this.props.dispatchUser(Object.assign({}, e.userInfo, loginUser)
    }).catch((err) => {
      Taro.showToast({
        title: 'no',
        icon: 'success',
        duration: 2000
      })
    })
  }

  // 登录
  login() {
    Taro.login().then((res) => {
      console.log(res)
    })
  }

  // 检查登录态是否过期
  checkSession() {
    Taro.checkSession({
      success () {
        console.log('登录状态未过期')
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        this.login()
      }
    })
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
          <Button openType='getUserInfo' className={styles.btn_login}>
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