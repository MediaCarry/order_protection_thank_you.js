const apiCall = "https://cfedb782e76f.ngrok.io/shopify/order/"+ {{ order_id }};

const getOrderProtectionId = async () => {
    const response = await fetch(apiCall);
    if (response.ok){
        const orderProtectionId = await response.json();

        addShopifyContent(
            `<p>Your Order Protection ID is ${orderProtectionId}. If you run into any issues, you are able to file a claim at <a target="_blank" href="http://localhost:3000/claims?op_id=${orderProtectionId}&email={{customer.email}}">Order Protection</a>.</p>`
        )
    } else {
        addShopifyContent(
            `<p>There was an issue processing your order with <b>Order Protection</b>. Please contact us.</p>`
      )
    }
}

addShopifyContent = (content) => {
    Shopify.Checkout.OrderStatus.addContentBox(content)
}

{% for line in checkout.line_items %}
    {% if line.vendor == 'Order Protection' %}
        getOrderProtectionId();
    {% endif %}
{% endfor %}