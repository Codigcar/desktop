package com.itana.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PhoneValidator implements ConstraintValidator<Phone, String> { 
  
  private int length;
  
  @Override
  public void initialize(Phone constraintAnnotation) {
    length = constraintAnnotation.length();
  }
  
  @Override
  public boolean isValid(String value, ConstraintValidatorContext context) {
    return value.matches("[0-9]+") && value.length() == length;
  }
  
}