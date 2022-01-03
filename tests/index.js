import { Selector } from "testcafe";

fixture`Home Page`.page(
  "https://r0241vmogb.execute-api.eu-central-1.amazonaws.com/dev/"
);

test("Should render restaurants", async (t) => {
  const restaurantList = Selector(".restaurant");
  await t.expect(restaurantList.count).eql(8);
});
