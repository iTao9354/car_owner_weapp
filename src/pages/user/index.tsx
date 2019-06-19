import { ComponentClass } from 'react'
import { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import styles from './index.scss'
import personalBg from '@/static/images/personal/personal-bg.png'
import personalHeadImg from '@/static/images/personal/icon-head.png'
import personalVipRight from '@/static/images/personal/system-moreb.png'
import personalSet from '@/static/images/personal/icon-set.png'
import personalVip from '@/static/images/personal/icon-vip.png'
import personalRightsCoupon from '@/static/images/personal/icon-rights-coupon.png'
import personalRightsTwo from '@/static/images/personal/icon-rights-two.png'
import personalRightsThree from '@/static/images/personal/icon-rights-three.png'
import personalRightsFour from '@/static/images/personal/icon-rights-four.png'
import personalCarOne from '@/static/images/personal/icon-car-one.png'
import personalCarTwo from '@/static/images/personal/icon-car-two.png'
import personalCarThree from '@/static/images/personal/icon-car-three.png'	
import personalCarFour from '@/static/images/personal/icon-car-four.png'
import personalListOne from '@/static/images/personal/icon-list-one.png'
import personalListTwo from '@/static/images/personal/icon-list-two.png'
import personalListThree from '@/static/images/personal/icon-list-three.png'
import personalListFour from '@/static/images/personal/icon-list-four.png'

type PageOwnProps = {}
type PageState = {
  havePhone: boolean
}
type IProps = PageOwnProps
interface User {
  props: IProps
  state: PageState
}

class User extends Component {
  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  constructor () {
    super()
    this.state = {
      havePhone: false
    }
  }

  render () {
    const { havePhone } = this.state

    return (
      <View className={styles.personal}>
        <View className={styles.personal_top}>
          <Image src={personalBg} className={styles.personal_bg}/>
          <View className={styles.personal_top_cont}>
            <View className={styles.personal_top_person}>
              <View className={styles.personal_top_person_img}>
                <Image src={personalHeadImg} className={styles.person_icon_img} />
              </View>
              <View className={styles.personal_top_person_name}>
                <View className={styles.person_name}>姚先生</View>
                <Text>{havePhone? '13898115462':'未绑定'}</Text>
              </View>
            </View>
            <View className={styles.personal_top_set}>
              <Image src={personalSet} className={styles.personal_icon_set}/>
              <Text>设置</Text>
            </View>
            <View className={styles.personal_top_vip}>
              <View className={styles.personal_top_vip_left}>
                <Image src={personalVip} className={styles.personal_icon_vip}/>
                <Text>roco会员</Text>
              </View>
              <View className={styles.personal_top_vip_right}>
                {
                  havePhone && <View className={styles.personal_top_vip_btn}>
                    <Text>绑定会员</Text>
                    <Image src={personalVipRight} className={styles.personal_top_vip_btn_icon}/>
                  </View>
                }
              </View>
            </View>
          </View>
        </View>
        
        <View className={styles.personal_main}>
          <View className={styles.personal_main_item}>
            <View className={styles.personal_main_item_title}>
              <Text>我的权益</Text>
            </View>
            <View className={styles.personal_main_item_box}>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalRightsCoupon} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>2</View>
                </View>
                <Text>代金券</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalRightsTwo} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>12</View>
                </View>
                <Text>项目券</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalRightsThree} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>...</View>
                </View>
                <Text>我的奖品</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalRightsFour} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>12</View>
                </View>
                <Text>我的礼包</Text>
              </View>
            </View>
          </View>
          
          <View className={styles.personal_main_item}>
            <View className={styles.personal_main_item_title}>
              <Text>车辆保养</Text>
            </View>
            <View className={styles.personal_main_item_box}>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalCarOne} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>12</View>
                </View>
                <Text>待使用订单</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalCarTwo} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>12</View>
                </View>
                <Text>保养记录</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalCarThree} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>12</View>
                </View>
                <Text>已预约</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalCarFour} className={styles.personal_main_item_icon}/>
                  <View className={styles.personal_main_item_tip}>1</View>
                </View>
                <Text>我的车辆</Text>
              </View>
            </View>
          </View>
          
          <View className={styles.personal_main_item}>
            <View className={styles.personal_main_item_title}>
              <Text>我的实物订单</Text>
            </View>
            <View className={styles.personal_main_item_box}>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalListOne} className={styles.personal_main_item_icon_sm}/>
                </View>
                <Text className={styles.personal_main_item_text_sm}>待发货</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalListTwo} className={styles.personal_main_item_icon_sm}/>
                </View>
                <Text className={styles.personal_main_item_text_sm}>待收货</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalListThree} className={styles.personal_main_item_icon_sm}/>
                </View>
                <Text className={styles.personal_main_item_text_sm}>已完成</Text>
              </View>
              <View className={styles.personal_main_item_box_one}>
                <View className={styles.personal_main_item_box_one_img}>
                  <Image src={personalListFour} className={styles.personal_main_item_icon_sm}/>
                </View>
                <Text className={styles.personal_main_item_text_sm}>全部订单</Text>
                <View className={styles.personal_main_item_list_tip}>
                  <View className={styles.personal_main_item_list_tip_img}>
                    <Image src={personalVipRight} className={styles.personal_list_icon}/>
                  </View>
                </View>
              </View>
            </View> 
          </View>
        </View>
      </View>
    )
  }
}

export default User as ComponentClass<PageOwnProps, PageState>