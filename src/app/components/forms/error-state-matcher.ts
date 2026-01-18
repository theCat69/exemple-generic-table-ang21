import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/**
 * A custom matcher that shows errors immediately
 * (even if the user hasn't touched the field yet).
 */
export class ImmediateErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: AbstractControl | null): boolean {
    // Standard logic: Is the control invalid?
    const isInvalid = control ? control.invalid : false;

    // Custom logic: Return true if invalid, ignoring 'touched' or 'submitted' state
    return !!(control && isInvalid);
  }
}
