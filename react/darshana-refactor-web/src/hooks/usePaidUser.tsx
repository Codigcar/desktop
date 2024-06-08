import { useState, useEffect } from 'react';

import { darshanaApi } from '@api/darshanaApi';

const usePaidUserValidation = (user: any) => {
  const [isPaidUser, setIsPaidUser] = useState(false);

  const getValidationsDetails = async () => {
    try {
      const response = await darshanaApi.get(
        `/validation_checkout?email=${user?.email}`
      );
      if (response.data.data[0].verification_number > 0) {
        setIsPaidUser(true);
      }
    } catch (error) {
      console.error('Error fetching validation details:', error);
    }
  };

  useEffect(() => {
    getValidationsDetails();
  }, [user?.email]); // Trigger effect when user email changes

  return isPaidUser;
};

export default usePaidUserValidation;
