import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../../services/rest.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Article} from '../../domain/article';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private _rest: RestService) { }

  @Input()
  article: Article;

  @Input()
  callback: BehaviorSubject<Article>;


  form: FormGroup;

  submitted: boolean;

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    console.log(this.article);
    this.form = this.fb.group({
      articleType: this.fb.control(this.article.articleType, Validators.required),
      publishDate: this.fb.control(this.article.publishDate),
      title: this.fb.control(this.article.title, Validators.required),
      text: this.fb.control(this.article.text)
    });
  }

  onSubmit({ value, valid }: { value: Article, valid: boolean }) {
    this.submitted = true;
    if (valid) {
      if (this.article.id) {
        this._rest.update('api/articles/' + this.article.id, value)
          .subscribe(re => {
            this.activeModal.close();
            this.callback.next(re);
          });
      } else {
        this._rest.create('api/articles', value).subscribe(re => {
          this.activeModal.close();
          this.callback.next(re);
        });
      }
    }
  }

  invalid(field: string): boolean {
    const f = this.form.get(field);
    return f.invalid && (f.dirty || f.touched || this.submitted);
  }

  computeModalTitle(): string {
    if (this.article.id === undefined) {
      return 'Add New Article';
    } else {
      return 'Editing: ' + this.article.title;
    }
  }

  computeModalSubTitle(): string {
    if (this.article.id === undefined) {
      return '';
    } else {
      return 'by ' + this.article.author.name;
    }
  }

}
