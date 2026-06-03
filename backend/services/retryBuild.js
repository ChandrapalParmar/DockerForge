async function retryBuild(
 buildFunction,
 repoPath,
 maxAttempts = 3
){

 let attempts = 0;

 let result;

 while(
  attempts < maxAttempts
 ){

  attempts++;

  result =
   await buildFunction(
    repoPath
   );

  if(result.success){

   result.attempts =
    attempts;

   return result;
  }
 }

 result.attempts =
  attempts;

 return result;
}

module.exports =
retryBuild;