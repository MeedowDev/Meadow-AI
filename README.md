## Clevaenergy  

This document entails basic coding and design patterns to be followed in contribution to ensure maintainability and consistency through the code and the overall react community

### Variable and constants naming:
  
Camel case will be used. Examples:    
`export const primaryColor`  
`export const secondary color`  
  
Shared constants will be in caps. examples:  
`export const PRIMARY_COLOR`  
`export const SECONDARY_COLOR`  
  
All other constants will only have the first character in caps. examples:  
`const MouseStartPosition`  
  
### Naming convections:  
  
#### Booleans:  

Booleans should have prefixes indicating they are booleans. Examples:  
Prefixes:  
`is` `has` `can`  
Examples:  
`isLoggedIn` `hasError` `canSubmit`  

### Functions:  

Actionable verbs should be used for functions.   
examples:
`function fetchApi`  
`function handleSubmit`  
`function formatDate`   

avoid:
`function submitButton`

### Constants and variables:  

Use descriptive nouns. examples:
`const MaxLangth`  
`var apiUrl`  
