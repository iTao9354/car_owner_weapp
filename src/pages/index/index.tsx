import { ComponentClass } from 'react'
import { Component, Config } from '@tarojs/taro'
import { View, Image, Button, Text } from '@tarojs/components'
import styles from './index.scss'
import logoImg from '@/static/images/logo.png'
import wxImg from '@/static/images/icon-wx.png'

// store里的数据
type PageStateProps = {}
// store里的方法
type PageDispatchProps = {}
// 父子组件传递的props
type PageOwnProps = {}
// 自己的data
type PageState = {}

type IProps = PageStateProps & PageOwnProps & PageDispatchProps

interface Index {
  props: IProps
  state: PageState
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor (props) {
    super(props)
    this.state = {
      ifAuthorized: true
    }
  }

  componentDidMount () {
    // 这里写初始化方法
  }

  render () {
    return (
      <View className={styles.wrap_login}>
        <Image src={logoImg} className={styles.img_logo}></Image>
        <View className={styles.title}>大诚车服</View>
        <View className={styles.subtitle}>一站式车主养车平台</View>
        <View className={styles.tip}>一键开启便捷车生活</View>
        <Button openType="getUserInfo" className={styles.btn_login}>
          <Image src={wxImg} className={styles.img_wx}></Image>
          <Text className={styles.text}>微信登录</Text>
        </Button>
      </View>
    )
  }
}

  // #region 导出注意 
  // 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性  
  // 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
  // #endregion
export default Index as ComponentClass<PageOwnProps, PageState>