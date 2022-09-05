import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEFAULT_API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI4ZTNlZjUzNi0wZWQ5LTQ4YzAtOTFlYS1kNzUwYjk0Nzk4ZDMiLCJlbWFpbCI6Im1lQHJvc3NuZWlsc29uLmRldiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJhNTQ3NmE0NWZmNzk1OGQyMWNjNyIsInNjb3BlZEtleVNlY3JldCI6ImJjZWUzODc3YzNhZTk5NDZjNmJiNDNkMDViNzA0NjE4MTdiMGI1NzBlMjU1NWFmNDIzNDRkNTNkY2FmNDIzNTYiLCJpYXQiOjE2NjE1MDQ5OTR9.pyjCF2linJhQIFnXZfN7Jv_Yx0E6BZemUi3cn8NNJD8';

const usePinataIPFS = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();

  const authenticate = async () => {
    const url = 'https://api.pinata.cloud/data/testAuthentication';
    const headers = { Authorization: `Bearer ${DEFAULT_API_KEY}` };
    const result = await fetch(url, { headers });
    if (result.status === 200) setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  const pinJSON = async jsonData => {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEFAULT_API_KEY}`,
    };
    const result = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(jsonData),
    });
    if (result.status !== 200) {
      throw new Error(
        `${t('couldUploadToPinata')}. ${t('error')}: ${result.status}`
      );
    }
    return result.json();
  };

  const pinByHash = async (hash: string) => {
    const url = 'https://api.pinata.cloud/pinning/pinByHash';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEFAULT_API_KEY}`,
    };

    const data = { hashToPin: hash };

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

  return { authenticate, pinJSON, pinByHash };
};

export default usePinataIPFS;
