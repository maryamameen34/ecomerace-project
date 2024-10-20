import React from 'react';
import ProductUploadForm from '../../componants/forms/UploadProduct';

const ProductUploadPage = () => {
    return (
        <div>
            <h1 className='text-center text-2*l font-bold mt-8'>Upload a New Product</h1>
            <ProductUploadForm />
        </div>
    );
};

export default ProductUploadPage;
