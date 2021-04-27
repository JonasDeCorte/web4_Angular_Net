import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Personeel } from './personeel.model';

@Component({
  selector: 'app-personeel',
  templateUrl: './personeel.component.html',
  styleUrls: ['./personeel.component.css']
})
export class PersoneelComponent implements OnInit {
  @Input() public personeel: Personeel;

  title = 'Personeels register';

  constructor( private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(): void {
    const persId = this.route.snapshot.paramMap.get('id');
  }
  onEdit(){
    const persId = this.personeel ? this.personeel.id : null;
    this.router.navigate([`/personeel/edit/${persId}`]);
  }
  
}
