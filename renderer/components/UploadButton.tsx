import { getProductsQueryKey } from "@/hooks/services/useProductsQuery";
import IProductUI from "@/interfaces/IProduct";
import strapi from "@/libs/strapi";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  product: IProductUI;
}

const UploadButton = ({ product }: IProps) => {
  const queryClient = useQueryClient();
  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    const [productImage] = await fetch(
      "https://control.cajaregistradora.app/api/upload",
      {
        method: "POST",
        body: new FormData(e.target),
        headers: {
          Authorization: "Bearer " + strapi.getToken(),
          "Access-Control-Allow-Origin":
            "https://control.cajaregistradora.app/",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Authorization, Content-Type",
        },
      }
    ).then((res) => res.json());
    await strapi.update(getProductsQueryKey(), product.id, {
      image: productImage,
    });
    queryClient.invalidateQueries(getProductsQueryKey());
  };

  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-max rounded-lg"
      />
      <input
        type="file"
        name="files"
        className="file-input file-input-bordered file-input-secondary w-full max-w-xs"
      />
      <button type="submit" className="btn btn-success w-min">
        Guardar foto
      </button>
    </form>
  );
};

export default UploadButton;
