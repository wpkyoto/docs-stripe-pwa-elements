---
slug: "/blog/hello-stripe-webcomponent"
date: "2021-09-20"
title: "Hello Stripe Element Webcomponent!"
---

Hi!

Thanks for visiting our Webcomponent library page!

This is a Stripe Element utility for the Web Component.

We can use several Stripe Element features as same as HTML (by using WebComponent).

## Example

```html
      <stripe-element-modal open="true">
          <stripe-payment-sheet
            publishable-key="pk_test_xxxxx"
            show-label="false"
            intent-client-secret="pi-xxxxxx"
            should-use-default-form-submit-action="false"
          ></stripe-payment-sheet>
      </stripe-element-modal>
```

And we can use this component as a JavaScript.

```javascript
        const stripePublishableAPIKey = 'YOUR_STRIPE_PUBLISHABLE_API_KEY'

        const form = document.getElementById('open-modal-form')
        const resultElement = document.getElementById('result')
        const errorMessage = document.getElementById('error-message')
        const targetElement = document.getElementById('stripe');
        const modalElement = document.createElement('stripe-element-modal');

        /**
         * Remove Mounted Stripe Elements when the modal has been closed
         **/
        customElements.whenDefined('stripe-element-modal')
            .then(() => {
                modalElement.addEventListener('close', () => {
                    modalElement.innerHTML = ''
                })
            })
        
        async function launchStripePaymentSheet (paymentIntentClientSecret) {
            if (!stripePublishableAPIKey) {
                errorMessage.innerText = 'Stripe Publishable API Key is required'
                return
            }
            if (!paymentIntentClientSecret) {
                errorMessage.innerText = 'Payment Intent Client Secret is required'
                return
            }

            /**
             * Define and launch Web Components
             **/
            const stripeElement = document.createElement('stripe-payment-sheet');
            modalElement.appendChild(stripeElement);
            targetElement.appendChild(modalElement);

            /**
             * Wait for defining these components
             **/
            await customElements.whenDefined('stripe-element-modal')
            await customElements.whenDefined('stripe-payment-sheet')
            
            /**
             * Load Stripe Client
             **/
            await stripeElement.initStripe(stripePublishableAPIKey)


            /**
             * Set the payment intent client secret
             **/
            stripeElement.setAttribute('intent-client-secret', paymentIntentClientSecret)

            /**
             * Disable default form submit event
             **/
            stripeElement.setAttribute('should-use-default-form-submit-action', false);

            /**
             * Set custom form submit event manually
             **/
            stripeElement.addEventListener('formSubmit', async props => {
              const {
                detail: { stripe, cardNumber, event },
              } = props;
              const result = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumber,
              });
              resultElement.innerHTML = `<pre><code>${JSON.stringify(result,null,2)}</code></pre>`
              stripeElement.updateProgress('success');
              await modalElement.closeModal()
            });

            /**
             * Open modal
             **/
            modalElement.setAttribute('open', true)
        })
```