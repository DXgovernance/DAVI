import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { useTranslation } from 'react-i18next';

const DEFAULT_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTNlZjUzNi0wZWQ5LTQ4YzAtOTFlYS1kNzUwYjk0Nzk4ZDMiLCJlbWFpbCI6Im1lQHJvc3NuZWlsc29uLmRldiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhNDZmYjNjNWJhZmM2ZjNhNDY4YSIsInNjb3BlZEtleVNlY3JldCI6IjIwMmIxMWY3Y2JkNWQxMDU3MzM5M2I5MGU2YWM2ODFjOTNhNzZmMWUxMDAyMjNmYTY3NDUzMzdmZDg5ZDYyNDciLCJpYXQiOjE2NzI3NjQ2MTV9.huqj1aefwohZPJ5qfKJjzH_mn8Wv0LDrpp-_u-IjSGg';

interface DataInterface {
  pinataMetadata: {
    name: string;
    keyValues: {
      type: string;
    };
  };
  pinataContent?: any;
  hashToPin?: string;
}

const usePinataIPFS = () => {
  const { t } = useTranslation();
  const { chainName } = useTypedParams();

  const pinToPinata = async (hash: string, jsonData?: any) => {
    let data: DataInterface = {
      pinataMetadata: {
        name: `DXdao ${chainName} DescriptionHash ${hash}`,
        keyValues: { type: 'proposal' },
      },
    };

    let url: string;
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'Accept: text/plain',
      Authorization: `Bearer ${DEFAULT_API_KEY}`,
    };

    if (jsonData) {
      url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
      data.pinataContent = jsonData;
    } else {
      url = 'https://api.pinata.cloud/pinning/pinByHash';
      data.hashToPin = hash;
    }

    const result = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    if (result.status !== 200) {
      throw new Error(
        `${t('couldUploadToPinata')}. ${t('error')}: ${result.status}`
      );
    }

    return result.json();
  };

  return { pinToPinata };
};

export default usePinataIPFS;
