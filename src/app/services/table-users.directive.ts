import { Directive } from '@angular/core';

@Directive({
  selector: '[userId]'
})
export class UserIdDirective {}

@Directive({
  selector: '[userName]'
})
export class UserNameDirective {}

@Directive({
  selector: '[userAge]'
})
export class UserAgeDirective {}

@Directive({
  selector: '[userDate]'
})
export class UserDateDirective {}

@Directive({
  selector: '[userAvatar]'
})
export class UserAvatarDirective {}
