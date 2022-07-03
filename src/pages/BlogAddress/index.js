import { Fragment, useContext, useState } from 'react';
import BottomAddress from './BottomBlogAddress/BottomAddress';
import HeaderAddress from './HeaderBlogAddress';
import CenterAddress from './CenterBlogAddress';
import DiscountForm from './DiscountForm';
import { FormDiscountContext } from './FormDiscountContext';
import { Left, Right, Paginate } from '../../components/Layouts/components';

function BlogAddress() {
    const formContext = useContext(FormDiscountContext)

    return (
        // <FormDiscountProvider>
            <Fragment>
                <div className='row m-0 ps-1 pe-1' style={{ maxHeight: '550px' }}>
                    <HeaderAddress />
                    <CenterAddress />
                </div>
                <div className='row m-0 ps-1 pe-1 mt-3'>
                    <div className="col-sm-2 ps-0 pe-0 mb-2">
                        <Left />
                    </div>
                    
                    <div className="col-sm-8">
                        <BottomAddress />
                        <Paginate />
                    </div>
                    
                    <div className="col-sm-2 ps-0 pe-0 mb-2">
                        <Right />
                    </div>
                </div>
                { formContext.showForm && <DiscountForm/> }
            </Fragment>
        // </FormDiscountProvider>
    );
}
export default BlogAddress;