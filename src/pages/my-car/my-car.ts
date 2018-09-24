import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from "../../providers/utils/utils";
import { BmobProvider } from "../../providers/bmob/bmob"
import { ValidUser } from "../../model/dada"
/**
 * Generated class for the MyCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-car',
  templateUrl: 'my-car.html',
})
export class MyCarPage {

  carInfo:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public util:UtilsProvider,public bmob: BmobProvider) {
  }

  ionViewDidEnter() {
    this.getInfo()
  }
  getInfo(){
    this.util.startLoading()
    this.bmob.getUserNewInfo().then((obj:any) => {
      let uPoint = this.bmob.Bmob_CreatePoint('_User',obj.objectId);
      if(!!obj.isCompany && obj.isCompany >0){
        console.log(1111)
        this.bmob.Bmob_IncludeQuery('validUser',{'user':uPoint},{key:'uInfo',value:'userInfo'}).then(async(res:Array<ValidUser>) => {
          res.length > 0 && (this.carInfo = res);
          this.util.stopLoading();
        }).catch(err => {
          console.log(err)
          this.util.stopLoading();
        })
      }else{
        console.log(22)
        console.log(obj.carInfo.objectId)
        this.bmob.Bmob_IncludeQuery('validUser',{'objectId':obj.carInfo.objectId},{key:'uInfo',value:'userInfo'}).then((res:Array<ValidUser>) => {
          res.length > 0 && (this.carInfo = res)
          this.util.stopLoading();
        }).catch(err => {
          this.util.stopLoading();
        })
      }
    })

  }
}
