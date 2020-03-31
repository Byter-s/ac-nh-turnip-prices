function* generate_pattern_2(given_prices) {
  /*
      // PATTERN 2: consistently decreasing
      rate = 0.9;
      rate -= randfloat(0, 0.05);
      for (work = 2; work < 14; work++)
      {
        sellPrices[work] = intceil(rate * basePrice);
        rate -= 0.03;
        rate -= randfloat(0, 0.02);
      }
      break;
  */


  buy_price = given_prices[0];
  var predicted_prices = [
    {
      min: buy_price,
      max: buy_price,
    },
    {
      min: buy_price,
      max: buy_price,
    },
  ];

  var min_rate = 0.85;
  var max_rate = 0.9;
  for (var i = 2; i < 14; i++) {
    min_pred = Math.ceil(min_rate * buy_price);
    max_pred = Math.ceil(max_rate * buy_price);


    if (!isNaN(given_prices[i])) {
      if (given_prices[i] < min_pred || given_prices[i] > max_pred ) {
        // Given price is out of predicted range, so this is the wrong pattern
        return;
      }
      min_pred = given_prices[i];
      max_pred = given_prices[i];
      min_rate = given_prices[i] / buy_price;
      max_rate = given_prices[i] / buy_price;
    }

    predicted_prices.push({
      min: min_pred,
      max: max_pred,
    });

    min_rate -= 0.05;
    max_rate -= 0.03;
  }
  yield predicted_prices;
}




function* generate_possibilities(sell_prices) {
  //yield* generate_pattern_0(sell_prices);
  //yield* generate_pattern_1(sell_prices);
  yield* generate_pattern_2(sell_prices);
  //yield* generate_pattern_3(sell_prices);
}

$(document).on("input", function() {
  // Update output on any input change

  /*
  switch (whatPattern)
  {
  case 0:
    // PATTERN 0: high, decreasing, high, decreasing, high
    work = 2;
    decPhaseLen1 = randbool() ? 3 : 2;
    decPhaseLen2 = 5 - decPhaseLen1;

    hiPhaseLen1 = randint(0, 6);
    hiPhaseLen2and3 = 7 - hiPhaseLen1;
    hiPhaseLen3 = randint(0, hiPhaseLen2and3 - 1);

    // high phase 1
    for (int i = 0; i < hiPhaseLen1; i++)
    {
      sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    }

    // decreasing phase 1
    rate = randfloat(0.8, 0.6);
    for (int i = 0; i < decPhaseLen1; i++)
    {
      sellPrices[work++] = intceil(rate * basePrice);
      rate -= 0.04;
      rate -= randfloat(0, 0.06);
    }

    // high phase 2
    for (int i = 0; i < (hiPhaseLen2and3 - hiPhaseLen3); i++)
    {
      sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    }

    // decreasing phase 2
    rate = randfloat(0.8, 0.6);
    for (int i = 0; i < decPhaseLen2; i++)
    {
      sellPrices[work++] = intceil(rate * basePrice);
      rate -= 0.04;
      rate -= randfloat(0, 0.06);
    }

    // high phase 3
    for (int i = 0; i < hiPhaseLen3; i++)
    {
      sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    }
    break;
  case 1:
    // PATTERN 1: decreasing middle, high spike, random low
    peakStart = randint(3, 9);
    rate = randfloat(0.9, 0.85);
    for (work = 2; work < peakStart; work++)
    {
      sellPrices[work] = intceil(rate * basePrice);
      rate -= 0.03;
      rate -= randfloat(0, 0.02);
    }
    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    sellPrices[work++] = intceil(randfloat(1.4, 2.0) * basePrice);
    sellPrices[work++] = intceil(randfloat(2.0, 6.0) * basePrice);
    sellPrices[work++] = intceil(randfloat(1.4, 2.0) * basePrice);
    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    for (; work < 14; work++)
    {
      sellPrices[work] = intceil(randfloat(0.4, 0.9) * basePrice);
    }
    break;
  case 2:

  case 3:
    // PATTERN 3: decreasing, spike, decreasing
    peakStart = randint(2, 9);

    // decreasing phase before the peak
    rate = randfloat(0.9, 0.4);
    for (work = 2; work < peakStart; work++)
    {
      sellPrices[work] = intceil(rate * basePrice);
      rate -= 0.03;
      rate -= randfloat(0, 0.02);
    }

    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * (float)basePrice);
    sellPrices[work++] = intceil(randfloat(0.9, 1.4) * basePrice);
    rate = randfloat(1.4, 2.0);
    sellPrices[work++] = intceil(randfloat(1.4, rate) * basePrice) - 1;
    sellPrices[work++] = intceil(rate * basePrice);
    sellPrices[work++] = intceil(randfloat(1.4, rate) * basePrice) - 1;

    // decreasing phase after the peak
    if (work < 14)
    {
      rate = randfloat(0.9, 0.4);
      for (; work < 14; work++)
      {
        sellPrices[work] = intceil(rate * basePrice);
        rate -= 0.03;
        rate -= randfloat(0, 0.02);
      }
    }
    break;
  }

  sellPrices[0] = 0;
  sellPrices[1] = 0;
}
*/

  var buy_price = parseInt($("#buy").val());

  var sell_prices = [buy_price, buy_price];
  for (var i = 2; i < 14; i++) {
    sell_prices.push(parseInt($("#sell_" + i).val()));
  }

  var output_possibilities = "";
  for (let poss of generate_possibilities(sell_prices)) {
    var out_line = ""
    for (let day of [...poss].slice(2)) {
      out_line += day.min + ".." + day.max + " "
    }
    output_possibilities += out_line + "<br>"
  }

  $("#output").html(output_possibilities)
})