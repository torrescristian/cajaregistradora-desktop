/* import { VARIANTS_KEY } from "@/modules/common/consts";
import { IVariant } from "@/modules/common/interfaces/IVariants";
import strapi from "@/modules/common/libs/strapi";
import { useMutation } from "@tanstack/react-query";

interface IProps {
    productId: number,
    variant: IVariant,

}

export default function useCreateNewVariant() {

    return useMutation(async ({ productId, variant }: IProps) => {
        const resp = await strapi.create(VARIANTS_KEY, productId, {
            name: variant.name,
            price: variant.price,
            product: productId,
        })
        return resp;
    })
} */
