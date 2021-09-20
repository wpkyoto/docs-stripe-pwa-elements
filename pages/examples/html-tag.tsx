import type { NextPage } from "next";
import { PageLayout } from "../../components/Layouts/PageLayout";

const ExampleHtmlTag: NextPage = () => {
  return (
    <PageLayout title="Example: HTML Tag">
      <pre>
          <code>
              {`
    <stripe-element-modal open="true">
      <stripe-payment-sheet
        publishable-key="pk_test_xxxxx"
        show-label="false"
        intent-client-secret="pi-xxxxxx"
        should-use-default-form-submit-action="false"
      ></stripe-payment-sheet>
    </stripe-element-modal>
              `}
          </code>
      </pre>
    </PageLayout>
  );
};

export default ExampleHtmlTag;
