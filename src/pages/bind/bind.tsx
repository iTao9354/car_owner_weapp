import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Form, Label, Text, Input, Button } from '@tarojs/components'
import classNames from 'classnames'
import * as validator from '@/utils/validator'
import styles from './bind.scss'
import logoImg from '@/static/images/logo.png'
import { BindService } from '@/services/bind'
import { ResponseSuccess } from '@/models/response'

type PageOwnProps = {}
type PageState = {
  mobile: string,
  code: string,
  codeFlag: boolean,
  leftTime: number,
  submitting: boolean
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
      leftTime: 60,
      submitting: true // 可提交
    }
  }

  // 更新input
  inputHandler = (key, e) => {
    this.setState({
      [key]: e.detail.value
    })
  }

  // 发送验证码
  bindService = new BindService()
  async sendCode () {
    console.log('点我啊')
    if (this.validMobile()) {
      Taro.showLoading()
      try {
        const res = await this.bindService.doSendSms(this.state.mobile)
        if (res.data.code === ResponseSuccess) {
          console.log(res.data)
          Taro.showToast({
            title: '发送成功，10分钟内有效',
            icon: 'none',
            duration: 2000
          })
          this.setState({
            codeFlag: true
          })
          let timer = setInterval(() => {
            this.setState((prevState: PageState) => ({
              leftTime: prevState.leftTime - 1
            }))
            if (this.state.leftTime === 0) {
              clearInterval(timer)
              // 重新获取
              this.setState({
                codeFlag: false,
                leftTime: 59
              })
            }
          }, 1000)
        }
      } catch (e) {}
      Taro.hideLoading()
    }
  }

  // 校验手机号
  validMobile () {
    const trimmedMobile = this.state.mobile.trim()
    if (trimmedMobile === '') {
      Taro.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    } else if (!validator.MobileValid(trimmedMobile)) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      return true
    }
  }
  // 校验验证码
  validCode () {
    const trimmedCode = this.state.code.trim()
    if (trimmedCode === '') {
      Taro.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    } else if (!validator.CaptchaValid(trimmedCode, 4)) {
      Taro.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      return true
    }
  }
  // 一键绑定
  async onSubmit () {
    if (!this.state.submitting) {
      return
    }
    if (this.validMobile() && this.validCode()) {
      this.setState({
        submitting: false
      })
      try {
        const { mobile, code } = this.state
        const res = await this.bindService.doBindMobile({ mobile, code })
        if (res.data.code === ResponseSuccess) {
          console.log('绑定成功')
          console.log(res.data)
        }
      } catch (e) {}
    }
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
                maxLength={6}
                value={code}
                onInput={this.inputHandler.bind(this, 'code')}
                onConfirm={this.onSubmit.bind(this)}
                className={styles.label_input}
                placeholder='请输入验证码'/>
            </View>
            {
              !codeFlag 
                ? <Button onClick={this.sendCode} className={styles.btn_get}>获取验证码</Button>
                : <Button className={styles.btn_time}><Text>重新获取({ leftTime }s)</Text></Button>
            }
          </Label>
          <View className={styles.bind_submit}>
            <Button onClick={this.onSubmit.bind(this)} className={styles.bind_btn}>一键绑定</Button>
          </View>
        </Form>
      </View>
    )
  }
}

export default Bind as ComponentClass<PageOwnProps, PageState>