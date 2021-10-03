import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { PageLayout } from "../../components/Layouts/PageLayout";

const ExampleHtmlTag: NextPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [open, setOpen] = useState<boolean>(false);

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
        setClientSecret(data.body.client_secret);
        setOpen(true);
        const target = document.querySelector("stripe-payment");
        if (target) {
          target.addEventListener("defaultFormSubmitResult", (props: any) => {
            if (props.detail.error) {
              alert("Error:" + props.detail.error);
            } else {
              alert(`PaymentIntent: ${props.detail.paymentIntent.id}`);
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setClientSecret, setOpen]);

  useEffect(() => {
    openModal();
  }, [openModal]);

  return (
    <PageLayout title="Example: HTML Tag">
      <pre>
        <code>
          {`
    <stripe-sheet open="true">
      <stripe-payment
        publishable-key="pk_test_xxxxx"
        show-label="false"
        intent-client-secret="pi-xxxxxx"
      ></stripe-payment>
    </stripe-sheet>
              `}
        </code>
      </pre>
      <stripe-sheet open={open}>
        <stripe-payment
          publishable-key={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          intent-client-secret={clientSecret}
          zip={false}
        ></stripe-payment>
      </stripe-sheet>
      <button onClick={() => openModal()}>Open modal again</button>
    </PageLayout>
  );
};

export default ExampleHtmlTag;
