export function isLocalEnv(): boolean {
  return window.location.host.startsWith('localhost');
}

export function chooseFile(): Promise<[string, string]> {
  const inputObj=document.createElement('input')
  inputObj.setAttribute('id','file');
  inputObj.setAttribute('type','file');
  inputObj.setAttribute('name','file');
  inputObj.setAttribute("style",'visibility:hidden');
  document.body.appendChild(inputObj);
  inputObj.click();
  
  return new Promise(resolve => {
    inputObj.onchange = () => {
      const file: any = inputObj.files?.[0];
      resolve([file, file?.name]);
    };
  });
}
