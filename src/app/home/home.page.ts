import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type: string="pending"
  constructor( public alertController: AlertController, public filmeService: FilmeService, 
    public toastController: ToastController, public popoverController: PopoverController) {}

    ngOnInit(){
      this.filmeService.getFromStorage();
    }
    async presentAlertPromptAdd() {
      const alert = await this.alertController.create({
        header: 'Adicionar filme',
        inputs: [
          {
            name:"filme",
            type:'text',
            placeholder: 'Filme'
          },
          {
            name: 'date',
            type: 'date',
            min: '2023-01-01',
            max: '2026-12-31'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Salvar',
            handler: (alertData) => {
              if (alertData.filme != "") {
                this.filmeService.addFilmes(alertData.filme, alertData.date);
              }
              else {
                this.presentToast();
                this.presentAlertPromptAdd();
              }
            }
          }
        ]
      });
      await alert.present();
    }
    async presentAlertPromptUpdate(index: number, filme:any) {
      const alert = await this.alertController.create({
        header: 'Atualziar filme',
        inputs: [
          {
            name:"filme",
            type:'text',
            placeholder: 'Filme'
          },
          {
            name: 'date',
            type: 'date',
            min: '2023-01-01',
            max: '2026-12-31',
            value: filme.date.getFullYear() + "-" + ((filme.date.getMonth() + 1) < 10 ? "0" + filme.date.getMonth() + 1 : filme.date.getMonth() + 1) + "-" + 
            ((filme.date.getDay() + 1) < 10 ? "0" + filme.date.getDay() : filme.date.getDay())
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel'
          },
          {
            text: 'Salvar',
            handler: (alertData) => {
              if (alertData.filme != "") {
                this.filmeService.updateFilmes(index, alertData.filme, alertData.date);
              }
              else {
                this.presentToast();
                this.presentAlertPromptUpdate(index, filme);
              }
            }
          }
        ]
      });
      await alert.present();
}
async presentAlertPromptDelete(index: number) {
  const alert = await this.alertController.create({
    header: 'Excluir filme',
    message: 'Deseja realmente excluir o filme',
    buttons:[
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Excluir',
        handler: () => {
          this.filmeService.delFilmes(index);
        }
      }
    ]
  });
  await alert.present();
}
async presentToast() {
  const toast = await this.toastController.create({
    message: "Veja o filme",
    duration: 2000
  });
  await toast.present();
}
// async presentPopover(ev: any){
//   const popover = await this.popoverController.create({
//     component: PopoverComponent,
//     event: ev,
//     translucent:true
//   });
//   return await popover.present()
//   }
}
