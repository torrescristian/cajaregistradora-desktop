import strapi from '@/modules/common/libs/strapi';
import { getCashBalanceKey } from './useActiveCashBalanceQuery';
import { ICashBalance } from '../interfaces/ICashBalance';
import { getErrorMessage } from '@/modules/common/libs/utils';

export default async function findACashById(
  cashId: number,
): Promise<ICashBalance | null> {
  try {
    const cashBalance = (await strapi.findOne(
      getCashBalanceKey(),
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
