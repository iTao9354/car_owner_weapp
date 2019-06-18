import { ComponentClass } from 'react'
import { Component, Config } from '@tarojs/taro'
import { View, Image, Form, Label, Text, Input, Button } from '@tarojs/components'
import classNames from 'classnames'
import styles from './bind.scss'
import logoImg from '@/static/images/logo.png'

type PageOwnProps = {}
type PageState = {
  mobile: string,
  code: string,
  codeFlag: boolean,
  leftTime: number
}
type IProps = PageOwnProps
interface Bind {
  props: IProps
  state: PageState
}

class Bind extends Component {
  config: Config = {
    navigationBarTitleText: 'xxx车服'
  }

  constructor () {
    super()
    this.state = {
      mobile: '',
      code: '',
      codeFlag: false,
      leftTime: 60
    }
  }

  // 更新input
  inputHandler = (key, e) => {
    this.setState({
      [key]: e.detail.value
    })
  }

  // 发送验证码
  sendCode () {
    console.log('点我啊')
    this.setState({
      codeFlag: true
    })
  }

  render () {
    const labelClass = classNames({
      [styles.label_wrap]: true,
      [styles.label_wrap_code]: true
    })
    const { mobile, code, codeFlag, leftTime } = this.state

    return (
      <View className={styles.wrap_bind}>
        <Image src={logoImg} className={styles.img_logo}/>
        <View className={styles.title}>xxx车服</View>
        <View className={styles.subtitle}>一站式车主养车平台</View>
        <Form className={styles.form_wrap}>
          <Label className={styles.label_wrap}>
            <Text className={styles.label_name}>手机号码</Text>
            <Input 
              type='number' 
              maxLength={11} 
              value={mobile}
              onInput={this.inputHandler.bind(this, 'mobile')}
              className={styles.label_input}
              placeholder='请输入手机号'/>
          </Label>
          <Label className={labelClass}>
            <View className={styles.code_wrap}>
              <Text className={styles.label_name}>验证码</Text>
              <Input 
                value={code}
                onInput={this.inputHandler.bind(this, 'code')}
                className={styles.label_input}
                placeholder='请输入验证码'/>
            </View>
            {
              !codeFlag 
                ? <Button onClick={this.sendCode} className={styles.btn_get}>获取验证码</Button>
                : <Button className={styles.btn_time}><Text>重新获取({ leftTime }s)</Text></Button>
            }
          </Label>
        </Form>
      </View>
    )
  }
}

export default Bind as ComponentClass<PageOwnProps, PageState>