
import PolicyPage from "@/components/common/PolicyPage";

const ReturnPolicyPage = () => {
  return (
    <PolicyPage title="Return Policy">
      <h2>1. Return Period</h2>
      <p>We accept returns within 30 days of purchase. Items must be in original condition with tags attached and in the original packaging.</p>

      <h2>2. Return Process</h2>
      <p>To initiate a return, please follow these steps:</p>
      <ol>
        <li>Contact our customer service team to request a return authorization.</li>
        <li>Package the item(s) securely in the original packaging.</li>
        <li>Include your order number and return reason.</li>
        <li>Ship the package to the address provided by our customer service team.</li>
      </ol>

      <h2>3. Refund Process</h2>
      <p>Once we receive and inspect your return, we will notify you of the status of your refund. If approved, your refund will be processed using the original method of payment. Please allow 7-10 business days for the refund to appear in your account.</p>

      <h2>4. Exchange Process</h2>
      <p>If you would like to exchange an item, please follow the return process and specify the item you would like in exchange. If the exchanged item is of greater value, you will need to pay the difference. If it is of lesser value, we will refund the difference.</p>

      <h2>5. Non-Returnable Items</h2>
      <p>The following items cannot be returned:</p>
      <ul>
        <li>Gift cards</li>
        <li>Downloadable products</li>
        <li>Personal care items (opened)</li>
        <li>Undergarments</li>
        <li>Custom orders</li>
      </ul>

      <h2>6. Damaged or Defective Items</h2>
      <p>If you receive a damaged or defective item, please contact our customer service team immediately. We will arrange for a return and replacement or refund.</p>

      <h2>7. Return Shipping Costs</h2>
      <p>Customers are responsible for return shipping costs unless the return is due to our error (shipping the wrong item, defective product, etc.).</p>

      <h2>8. Late or Missing Returns</h2>
      <p>If you are returning an item after the 30-day return period, we may accept the return at our discretion, but a restocking fee may apply. If we have not received your return after 14 days from the return authorization, please contact our customer service team.</p>
    </PolicyPage>
  );
};

export default ReturnPolicyPage;
