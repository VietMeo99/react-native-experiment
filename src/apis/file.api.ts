import {Asset} from 'react-native-image-picker';
// import RNFetchBlob from 'rn-fetch-blob';

import {ObjectType, StorageType} from 'models/file.model';
import authorizedRequest from 'utils/request/authorizedRequest';
import CONFIG from 'config';
import {tokenManager} from 'utils/tokenManager';

interface FileResponse {
  id: string;
  fileName: string;
  fileExtention: string;
  contentType: string;
}

export function getFileByObjectApi(params: {
  objectId: string;
  objectType: ObjectType;
  storageType?: StorageType;
}) {
  return authorizedRequest.get<Array<FileResponse>>(
    '/files/getFileByObjectIdAndObjectType',
    {
      params,
    },
  );
}

interface UploadFileResponse {
  id: number;
}

export function uploadFileApi(
  file: Asset,
  params: {objectType: ObjectType; storageType?: StorageType},
) {
  const form = new FormData();
  form.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  } as any);
  return authorizedRequest.post<UploadFileResponse>('/files/uploadFile', form, {
    params,
  });
}

export function applyFileApi(body: {
  listFileIds: Array<number>;
  objectId: string;
  objectType: ObjectType;
}) {
  return authorizedRequest.put('/files/upload', body);
}

export function downloadFileApi(file: {id: string; name: string}) {
  // const dirs = RNFetchBlob.fs.dirs;
  // return RNFetchBlob.config({
  //   // fileCache: true,
  //   path: dirs.DocumentDir + `/${file.name}`,
  // }).fetch('GET', CONFIG.BASE_URL + '/files/downloadFile/' + file.id, {
  //   Authorization: `Bearer ${tokenManager.token}`,
  // });
  return {} as any;
}
