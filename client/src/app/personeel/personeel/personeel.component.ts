import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Bewoner } from 'app/bewoner/bewoner.model';
import { PersoneelDataService } from '../personeel-data.service';
import { Personeel } from './personeel.model';

@Component({
  selector: 'app-personeel',
  templateUrl: './personeel.component.html',
  styleUrls: ['./personeel.component.css']
})
export class PersoneelComponent implements OnInit {
  @Input() public personeel: Personeel;
  bewoners: Bewoner[] = [];
  private fileToUpload: File = null;
  public image: any;
  constructor( private route: ActivatedRoute,
    private router: Router,
    private personeelDataService: PersoneelDataService,
    private _sanitizer: DomSanitizer ) {}

  ngOnInit(): void {
    const persId = this.route.snapshot.paramMap.get('id');
    this.personeelDataService.getImage(this.personeel.id).subscribe(data =>
      {
        if(data)
        {
        let objectURL = 'data:image/png;base64,' + data;
        this.image = this._sanitizer.bypassSecurityTrustUrl(objectURL);
        }
        else
        {
          this.image = null;
        }
        
      });
      this.personeel.bewoners.forEach(x => {
        this.bewoners.push(x);
      })
      
  }
  onEdit(){
    const persId = this.personeel ? this.personeel.id : null;
    this.router.navigate([`/personeel/edit/${persId}`]);
  }
  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];
    const persId = this.personeel ? this.personeel.id : null;
    this.onUpload(persId);
    console.log("Succes image uploaded");
    this.refreshPage();

  }
  private onUpload(persoonId: number)
  {
    this.personeelDataService.addImage(this.fileToUpload,persoonId).subscribe();
  }
 
  refreshPage() {
    window.location.reload();
   }
   deletePersoon(){
     this.personeelDataService.deletePersoon(this.personeel);
   }

}
