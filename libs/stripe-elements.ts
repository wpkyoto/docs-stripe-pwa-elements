
import { useEffect } from "react";
import {
    applyPolyfills,
    defineCustomElements,
} from '@stripe-elements/stripe-elements/loader'
export const useStripeElementWebComponent = () => {
    useEffect(() => {
        applyPolyfills()
        .then(() => {
            defineCustomElements(window)
        })
    },[])

}