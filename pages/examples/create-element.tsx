import type { NextPage } from "next";
import { useCallback, useEffect } from "react";
import { PageLayout } from "../../components/Layouts/PageLayout";

const ExampleUsingCreateElement: NextPage = () => {
  const openModal = useCallback(() => {
    if (!document) return;
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) return;
    fetch("/api/stripe", {
      method: "POST",
      body: JSON.stringify({
        type: "payment_intent",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const target = document.getElementById("demo-target");
        const element = document.createElement("stripe-payment-sheet");
        target?.appendChild(element);
        customElements.whenDefined("stripe-payment-sheet").then(() => {
          element.setAttribute("zip", "false");
          element.setAttribute("intent-client-secret", data.body.client_secret);
          element.setAttribute("open", "true");
          element.setAttribute(
            "publishable-key",
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
          );
          element.addEventListener("defaultFormSubmitResult", (props: any) => {
            if (props.detail.error) {
              alert("Error:" + props.detail.error);
            } else {
              alert(`PaymentIntent: ${props.detail.paymentIntent.id}`);
            }
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    openModal();
  }, [openModal]);

  return (
    <PageLayout title="Example: Create Element">
      <pre>
        <code>
          {`
const paymentIntentClientSecret = 'PAYMENT_INTENT_CLIENT_SECRET_ID'

const target = document.getElementById("demo-target")
const element = document.createElement('stripe-payment-sheet')
target?.appendChild(element)
customElements
    .whenDefined('stripe-payment-sheet')
    .then(() => {
        element.setAttribute('zip', 'false')
        element.setAttribute('intent-client-secret', paymentIntentClientSecret)
        element.setAttribute('open', "true")
        element.setAttribute('publishable-key', process.env.STRIPE_PUBLISHABLE_KEY)
        element.addEventListener("defaultFormSubmitResult", (props) => {
            console.log(props)
        });
    })
})
              `}
        </code>
      </pre>
      <div id="demo-target"></div>
      <button onClick={() => openModal()}>Open modal again</button>
    </PageLayout>
  );
};

export default ExampleUsingCreateElement;
