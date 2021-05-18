import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Bewoner } from 'app/bewoner/bewoner.model';
import { NotificationServiceService } from 'app/notification-service.service';
import { PersoneelDataService } from '../personeel-data.service';
import { Personeel } from './personeel.model';

@Component({
  selector: 'app-personeel',
  templateUrl: './personeel.component.html',
  styleUrls: ['./personeel.component.css'],
})
export class PersoneelComponent implements OnInit {
  @Input() public personeel: Personeel;
  bewoners: Bewoner[] = [];
  private fileToUpload: File = null;
  public image: any;
  constructor(
    private route: ActivatedRoute,
    private personeelDataService: PersoneelDataService,
    private _sanitizer: DomSanitizer,
    private notificationService: NotificationServiceService
  ) {}

  ngOnInit(): void {
    const persId = this.route.snapshot.paramMap.get('id');
    this.personeelDataService.getImage(this.personeel.id).subscribe((data) => {
      if (data) {
        let objectURL = 'data:image/png;base64,' + data;
        this.image = this._sanitizer.bypassSecurityTrustUrl(objectURL);
      } else {
        this.image = null;
      }
    });
    this.personeel.bewoners.forEach((x) => {
      this.bewoners.push(x);
    });
  }
  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];
    const persId = this.personeel ? this.personeel.id : null;
    console.log(persId);
    this.onUpload(persId);
  }
  private onUpload(persoonId: number) {
    this.personeelDataService
      .addImage(this.fileToUpload, persoonId)
      .subscribe((result) => {
        this.refreshPage();
        this.notificationService.success('image was succesfully added');
      });
  }

  refreshPage() {
    window.location.reload();
  }
  deletePersoon() {
    this.notificationService.warn(`${this.personeel} was succesfully deleted`);
    this.personeelDataService.deletePersoon(this.personeel);
  }
}
