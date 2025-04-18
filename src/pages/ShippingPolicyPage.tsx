
import PolicyPage from "@/components/common/PolicyPage";

const ShippingPolicyPage = () => {
  return (
    <PolicyPage title="Shipping Policy">
      <h2>1. Shipping Methods</h2>
      <p>We offer the following shipping methods:</p>
      <ul>
        <li><strong>Standard Shipping:</strong> 3-5 business days</li>
        <li><strong>Express Shipping:</strong> 1-2 business days</li>
        <li><strong>International Shipping:</strong> 7-14 business days</li>
      </ul>

      <h2>2. Shipping Costs</h2>
      <p>Shipping costs are calculated based on your location and the weight of your order. The exact cost will be displayed at checkout before payment is processed.</p>

      <h2>3. Order Processing</h2>
      <p>Orders are processed within 24-48 hours after payment confirmation. You will receive a shipping confirmation email with tracking information once your order has been shipped.</p>

      <h2>4. Tracking Your Order</h2>
      <p>Once your order has been shipped, you can track it using the tracking number provided in your shipping confirmation email. You can also track your order by visiting our <a href="/track-order" className="text-brand hover:underline">Order Tracking</a> page.</p>

      <h2>5. Delivery Time</h2>
      <p>Delivery times vary depending on your location and the shipping method selected. Please note that delivery times are estimates and not guaranteed. Delays may occur due to customs, weather conditions, or other factors beyond our control.</p>

      <h2>6. International Orders</h2>
      <p>International customers are responsible for all customs duties, taxes, and fees that may be imposed by their country's customs authorities. These fees are not included in the shipping cost and are the responsibility of the customer.</p>

      <h2>7. Shipping Restrictions</h2>
      <p>We reserve the right to refuse shipping to certain locations. Please contact our customer service team if you have any questions about shipping to your location.</p>

      <h2>8. Lost or Damaged Packages</h2>
      <p>In the event that your package is lost or damaged during transit, please contact our customer service team immediately. We will work with the shipping carrier to resolve the issue.</p>
    </PolicyPage>
  );
};

export default ShippingPolicyPage;
