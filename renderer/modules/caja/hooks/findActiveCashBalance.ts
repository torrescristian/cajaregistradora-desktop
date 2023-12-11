import strapi from '@/modules/common/libs/strapi';

import { ICashBalance } from '../interfaces/ICashBalance';
import { getErrorMessage } from '@/modules/common/libs/utils';
import { CASH_BALANCE_KEY } from '@/modules/common/consts';

export default async function findACashById(
  cashId: number,
): Promise<ICashBalance | null> {
  try {
    const cashBalance = (await strapi.findOne(
      CASH_BALANCE_KEY,
      cashId,
    )) as unknown as ICashBalance;

    return cashBalance;
  } catch (error: any) {
    if ([401, 403].includes(getErrorMessage(error).status)) {
      return null;
    }

    return null;
  }
}
