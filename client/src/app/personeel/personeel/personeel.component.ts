import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PersoneelDataService } from '../personeel-data.service';
import { Personeel } from './personeel.model';

@Component({
  selector: 'app-personeel',
  templateUrl: './personeel.component.html',
  styleUrls: ['./personeel.component.css']
})
export class PersoneelComponent implements OnInit {
  @Input() public personeel: Personeel;
  private fileToUpload: File = null;
  public image: any;
  title = 'Personeels register';

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
  }
  onEdit(){
    const persId = this.personeel ? this.personeel.id : null;
    this.router.navigate([`/personeel/edit/${persId}`]);
  }
  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];
    const persId = this.personeel ? this.personeel.id : null;
    this.onUpload(persId);
    this.refreshPage();

  }
  private onUpload(persoonId: number)
  {
    this.personeelDataService.addImage(this.fileToUpload,persoonId).subscribe();
  }
  refreshPage() {
    window.location.reload();
   }

}
