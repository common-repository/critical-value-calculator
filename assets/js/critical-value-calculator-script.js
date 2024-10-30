//////////////////////
// Dom Manipulation //
//////////////////////
var SIGNIFICANT = 4;
let navigate_btn = document.querySelectorAll(".navigate_btn");
function __handler(event) {
  document.querySelectorAll(".input__form").forEach((el) => {
    fadeOutCritical(el, 5);
  });
  for (const el of document.querySelectorAll(".navigate_btn.active")) {
    el.classList.remove("active");
  }
  event.currentTarget.classList.add("active");
  target__id = event.currentTarget.getAttribute("data-target");

  document.getElementById("calculation__type__critical").value = target__id;
  fadeInCritical(__$(target__id), "block", 5);
}
navigate_btn.forEach((el, i) => {
  el.addEventListener("click", (e) => {
    document.querySelectorAll(".results").forEach((el) => {
      fadeOutCritical(el, 5);
    });
    __handler(e);
  });
});

Array.from(document.querySelectorAll(".calculate_btn")).forEach(function (el) {
  el.addEventListener("click", function (e) {
    let __error = false;
    let target__val = document.querySelector(
      "#calculation__type__critical"
    ).value;
    e.preventDefault();
    switch (target__val) {
      case "critical_value_t_form":
        calculateT();
        document.querySelector("#result__header").innerText =
          "T Critical Value";
        break;
      case "z_value":
        zCritical();
        document.querySelector("#result__header").innerText =
          "Z Critical Value";
        break;
      case "critical_value_chi_form":
        calculate_cv();
        document.querySelector("#result__header").innerText =
          "Chi-Square Critical Value";
        break;
      case "critical_value_f_form":
        calculate_cv("F");
        document.querySelector("#result__header").innerText =
          "F Critical Value";
        break;
      case "critical_value_r_form":
        calculate_r();
        document.querySelector("#result__header").innerText =
          "R Critical Value";
        break;
      default:
        alert("Wrong value");
        __error = true;
    }
    if (!__error) {
      fadeInCritical(__$("reset__btn"));
      fadeInCritical(document.querySelector("#tool_result"));
      Array.from(document.querySelectorAll(".input__form")).forEach(function (
        el
      ) {
        fadeOutCritical(el);
      });
      Array.from(document.querySelectorAll(".input__type")).forEach(function (
        el
      ) {
        fadeOutCritical(el);
      });
      let result__id = e.target.getAttribute("data-result");
      fadeInCritical(document.querySelector("#" + result__id), "grid");
      document.querySelector(".page__title").innerText = "Result:";
    }
  });
});
document
  .querySelector("#reset__btn input")
  .addEventListener("click", function (e) {
    let __error = false;
    let target__val = document.querySelector(
      "#calculation__type__critical"
    ).value;
    e.preventDefault();
    switch (target__val) {
      case "critical_value_t_form":
        fadeInCritical(__$("critical_value_t_form"), "block");
        break;
      case "z_value":
        fadeInCritical(__$("z_value"), "block");
        break;
      case "critical_value_chi_form":
        fadeInCritical(__$("critical_value_chi_form"), "block");
        break;
      case "critical_value_f_form":
        fadeInCritical(__$("critical_value_f_form"), "block");
        break;
      case "critical_value_r_form":
        fadeInCritical(__$("critical_value_r_form"), "block");
        break;
      default:
        alert("Wrong value");
        __error = true;
    }
    if (!__error) {
      fadeOutCritical(__$("reset__btn"));
      fadeOutCritical(document.querySelector("#tool_result"));
      Array.from(document.querySelectorAll(".input__type")).forEach(function (
        el
      ) {
        fadeInCritical(el, "block");
      });

      document.querySelector(".page__title").innerText =
        "Critical Value Calculator";
    }
  });

////////////////////////////////
//HELPER FUNCTIONS///
////////////////////////////////
trim = (str) => {
  let result = str.replace(/^\s+|\s+$/gm, "");
  return result;
};
__$ = (id) => {
  return document.getElementById(id);
};
function hide($element) {
  $element.style.display = "none";
  $element.style.opacity = 0;
}
function show($element, display = "block") {
  $element.style.display = display;
  $element.style.opacity = 1;
  $element.style.visibility = "visible";
}
function fadeInCritical($element, display = "flex", time = 10) {
  $element.style.display = display;
  $element.style.opacity = 0;
  recurseWithDelayUpCritical($element, 0, 1, display, time);
}
function fadeOutCritical($element, time = 10) {
  $element.style.display = "none";
  $element.style.opacity = 1;
  recurseWithDelayDownCritical($element, 1, 0, time);
}

function recurseWithDelayDownCritical($element, startFrom, stopAt, time) {
  window.setTimeout(function () {
    if (startFrom > stopAt) {
      startFrom = startFrom - 0.1;
      recurseWithDelayDownCritical($element, startFrom, stopAt, time);
      $element.style.opacity = startFrom;
    } else {
      $element.style.display = "none";
    }
  }, time);
}
function recurseWithDelayUpCritical(
  $element,
  startFrom,
  stopAt,
  display = "flex",
  time
) {
  window.setTimeout(function () {
    if (startFrom < stopAt) {
      startFrom = startFrom + 0.1;
      recurseWithDelayUpCritical($element, startFrom, stopAt, display, time);
      $element.style.opacity = startFrom;
    } else {
      $element.style.display = display;
    }
  }, time);
}
function FtoZ(e, t, r) {
  return (
    (Math.pow(
      ((2 * r + (t * e) / 3 + t - 2) * e) / (2 * r + (4 * t * e) / 3),
      1 / 3
    ) -
      (1 - 2 / (9 * t))) /
    Math.sqrt(2 / (9 * t))
  );
}

function log10($n) {
  return Math.log($n) / Math.log(10);
}
function round_to_precision($x, $p) {
  $x = $x * Math.pow(10, $p);
  $x = Math.round($x);
  return $x / Math.pow(10, $p);
}
function precision($x) {
  return Math.abs(integer(log10(Math.abs($x)) - SIGNIFICANT));
}
function integer($i) {
  if ($i > 0) return Math.floor($i);
  else return Math.ceil($i);
}
function stuT(a, b) {
  a = Math.abs(a);
  var c = a / Math.sqrt(b),
    d = Math.atan(c);
  if (1 == b) return d / pi2;
  var e = Math.sin(d),
    f = Math.cos(d);
  return (
    (alpha =
      b % 2 == 1
        ? 1 - (d + e * f * stuComp(f * f, 2, b - 3, -1)) / pi2
        : 1 - e * stuComp(f * f, 1, b - 3, -1)),
    1 - alpha
  );
}
function stuComp(a, b, c, d) {
  for (var e = 1, f = e, g = b; g <= c;)
    (e = (e * a * g) / (g - d)), (f += e), (g += 2);
  return f;
}
function pStuT(a, b) {
  for (var c = 0.5, d = 0.5, e = 0; d > 1e-6;)
    (e = 1 / c - 1),
      (d /= 2),
      (qt = 1 - stuT(e, b)),
      qt > a ? (c -= d) : (c += d);
  return e;
}
function resConvert(a) {
  var b;
  return (b = a >= 0 ? a + 0e-4 : a - 0e-4);
}
function easyRoundOf(a, b) {
  if (isNaN(a)) return 0;
  b = Math.pow(10, parseConv(b));
  var c = Math.round(parseConv(a) * b) / b;
  return isNaN(c) ? 0 : c;
}
function parseConv(a) {
  return parseFloat(a);
}

function get_var(e) {
  var t, r, n;
  return null != (t = __$(e))
    ? ((r = get_variable(e)),
      null == (n = t.placeholder) && (n = ""),
      0 == r.length && 0 < n.length ? n : r)
    : null;
}
function get_variable(e) {
  var t = __$(e);
  return null == t
    ? null
    : ((nodeName1 = t.nodeName),
      "checkbox" == t.type
        ? t.checked
        : in_list(nodeName1, "TEXTAREA,INPUT,SELECT", !0)
          ? t.value
          : t.innerHTML);
}

function in_list(e, t, r) {
  return in_array(e, t.split(","), r);
}
function in_array(e, t, r) {
  for (var n = 0; n < t.length; n++)
    if ((r && e == t[n]) || (!r && -1 != t[n].indexOf(e))) return !0;
  return !1;
}
function set_variable(e, t) {
  var r = __$(e);
  if (null == r) console.error("Can't find HTML element ID: " + e);
  else {
    var n = r.nodeName;
    "checkbox" == r.type
      ? (r.checked = t)
      : in_list(n, "TEXTAREA,INPUT,SELECT", !0)
        ? (r.value = t)
        : (r.innerHTML = t);
  }
}

function check_empty_ids(e, t, r, n) {
  var o = 0;
  e = e.split(",");
  for (var a = 0; a < e.length; a++) {
    var i = __$(e[a]);
    null != i &&
      (0 == i.value.length && 0 < i.placeholder.length
        ? (i.value = i.placeholder)
        : (0 == i.value.length && 0 == i.placeholder.length) ||
          (!isNumber(i.value) && !isNumber(i.placeholder) && t)
          ? ((i.style.backgroundColor = r), o++)
          : (i.style.backgroundColor = ""));
  }
  return (
    null != __$(n) &&
    (0 < o
      ? (display_blocks(n, ""),
        set_variable(n, "<b>Please fill in more data!</b>"))
      : set_variable(n, "")),
    !(0 < o)
  );
}

function isNumber(e) {
  return !isNaN(e) && "" != e && -1 == e.indexOf(" ");
}

function display_blocks(e, t) {
  for (var r = e.split(","), n = 0; n < r.length; n++) {
    var o = document.getElementById(r[n]);
    null != o && (o.style.display = t);
  }
}

////////////////////////
//HELPER FUNCTIONS END//
////////////////////////

var pi2 = Math.PI / 2;
var a1result, a2result;

//////////////////////////////////////////////////////////
//T VALUE CALCULATOR VALIDATION AND RESULT MANIPULATION///
//////////////////////////////////////////////////////////

function calculateT() {
  var significance__level__t = document.querySelector(
    "#significance__level__t"
  ).value;
  var degree__of__freedom__t = document.querySelector(
    "#degree__of__freedom__t"
  ).value;
  if (significance__level__t == "" || degree__of__freedom__t == "") {
    alert("Enter Significant Level and Degrees of Freedom to calculate result");
    return false;
  }
  if (significance__level__t > 1 || significance__level__t < 0) {
    alert("Enter Significant Level values between 0 and 1");
    return false;
  }
  tCritical();
}
////////////////////////////////
//T Critical VALUE CALCULATOR///
////////////////////////////////

function tCritical() {
  var significance__level__t = document.querySelector(
    "#significance__level__t"
  ).value;
  var degree__of__freedom__t = document.querySelector(
    "#degree__of__freedom__t"
  ).value;
  if (significance__level__t == "" || degree__of__freedom__t == "") {
    alert(
      "Required! Enter Significant Level and Degrees of Freedom to calculate result"
    );
    return false;
  }
  if (significance__level__t > 0.5) {
    alert("Range Error! Enter Significant Level between 0 to 0.5.");
    return false;
  } else if (degree__of__freedom__t > 1000) {
    alert(
      "Range Error! Enter Degrees of Freedom should be less than the 1000."
    );
    return false;
  } else {
    var a2b = significance__level__t * 2;
    a1result = resConvert(pStuT(a2b, degree__of__freedom__t));
    a2result = resConvert(
      pStuT(significance__level__t, degree__of__freedom__t)
    );
    // Number of Rows
    var rloop = 15;
    if (degree__of__freedom__t < 15) {
      rloop = degree__of__freedom__t;
    }
    // Number of Columns
    var nloop = Math.ceil(degree__of__freedom__t / rloop);
    var dat1 = " ";
    let dat3 = "";
    // One Tailed Table
    for (i = 1; i <= rloop; i++) {
      for (j = 1; j <= nloop; j++) {
        var df1 = (j - 1) * 15 + i;
        if (df1 <= degree__of__freedom__t) {
          var a1 = easyRoundOf(resConvert(pStuT(a2b, df1)), 4);
          console.log(a1);
          if (df1 == degree__of__freedom__t) {
            dat1 = " " + a1;
            dat3 = " - " + a1;
          }
        }
      }
    }

    // Two Tailed Table
    var dat2 = "";
    for (i = 1; i <= rloop; i++) {
      for (j = 1; j <= nloop; j++) {
        var df2 = (j - 1) * 15 + i;
        if (df2 > degree__of__freedom__t) {
        } else {
          var a1 = easyRoundOf(
            resConvert(pStuT(significance__level__t, df2)),
            4
          );
          if (df2 == degree__of__freedom__t) {
            dat2 = " Â± " + a1;
            dat2Cus = a1;
          }
        }
      }
    }
    document.querySelector("#a1hname").value = dat1;
    document.querySelector("#a3hname").value = dat3;
    document.querySelector("#a2hname").value = dat2;
  }
}

//////////////////////////////
// Z Critical Value Calculator//
//////////////////////////////

function zCritical() {
  var pva = document.getElementById("pva").value;
  if (pva != "") {
    if (pva < 0 || pva > 1) {
      alert("Range Error! Significant Level value must be between 0 and 1");
      return false;
    }
    if (pva > 0 && pva < 1) {
      left__z__val = normal__inv(1 - pva, 0, 1);
      right__z__val = normal__inv(pva, 0, 1);
      z_two_tailed_value = normal__inv(pva / 2, 0, 1);
      z_two_tailed_neg_value = normal__inv(1 - pva / 2, 0, 1);

      document.querySelector("#a1hname2").value = round_to_precision(
        left__z__val,
        precision(left__z__val)
      );
      document.querySelector("#a3hname2").value = round_to_precision(
        right__z__val,
        precision(right__z__val)
      );
      document.querySelector("#a2hname2").value =
        round_to_precision(z_two_tailed_value, precision(z_two_tailed_value)) +
        " & " +
        round_to_precision(
          z_two_tailed_neg_value,
          precision(z_two_tailed_neg_value)
        );

      // document.getElementById("cva2").value = Math.abs(criva(pva).toFixed(4));
    }
    if (pva == 0) {
      document.getElementById("cva2").value = "-Inf";
    }
    if (pva == 1) {
      document.getElementById("cva2").value = "Inf";
    }
    return true;
  } else {
    alert("Required! Enter the Significant Level to calculate result");
    document.getElementById("cva2").value = "";
  }
  document.querySelector(".calculation_btn").attr("disabled", false);
}
function resetZ() {
  hide(document.querySelector("#tool_result"));
  hide(document.querySelector("#z_value_results"));
  hide(document.querySelector("#result_table"));
  // show(document.querySelector("#z_works"));
}

///////////////////////////////////
//Critical Value of R Calculator///
///////////////////////////////////
function calculate_r() {
  let alfa = parseFloat(document.getElementById("alpha__r").value);
  let freedom = parseFloat(document.getElementById("dfr").value);
  var t = t__inv(1 - alfa, freedom);

  var _2t = t__inv(1 - alfa / 2, freedom);
  var one_tailed = t / Math.sqrt(Math.pow(t, 2) + freedom);
  var two_tailed = _2t / Math.sqrt(Math.pow(_2t, 2) + freedom);
  set_var("r__right", round_to_precision(one_tailed, precision(one_tailed)));
  set_var(
    "r__left",
    "-" + round_to_precision(one_tailed, precision(one_tailed))
  );
  set_var("r__two", round_to_precision(two_tailed, precision(two_tailed)));
}

///////////////////////////////
//Chi-Square AND F Value Calculator//
///////////////////////////////
function calculate_cv(distribution__type = "Chi-Square", v = 2) {
  var a,
    t,
    i,
    s,
    c,
    b = 4,
    // b = get_var("digits"), //Uncomment to use dynamic Value

    // distribution__type = get_var("distribution1"), //Uncomment to use dynamic Value
    u = "table",
    p = "<a href='distribution-calculator.html'>";
  // console.log(get_var("digits"))
  "Normal" == distribution__type
    ? ((c = "z-score"),
      (u = "<a href='z_table.html#invest_z_table'>z - table</a>"))
    : "T" == distribution__type
      ? ((c = "t-score"), (u = "<a href='t_table.html'>t - table</a>"))
      : "Chi-Square" == distribution__type
        ? (c = "chi-square score")
        : "F" == distribution__type && (c = "F-score"),
    (p += c + " calculator<a>");
  // v = get_var("tails"), //Uncomment to use dynamic Value
  _ = get_var("alpha__chi");
  get_var("use_alpha");
  (_ < 0 || 1 < _) &&
    (alert(
      "The Significance level (&alpha;) must be between 0 and 1. you entered:" +
      _
    ),
      set_variable("alpha", "0.05"),
      (_ = 0.05));
  switch (distribution__type) {
    case "Normal":
      (a = 1 * get_var("x1")),
        (t = 1 * get_var("sigma1")),
        check_empty_ids("alpha,x1,sigma1", !1, "#f5c6c6", "warning1"),
        (s = { mean: a, std: t });
      break;
    case "Chi-Square":
      s = { df: 1 * get_var("df") };
      break;
    case "T":
      s = { df: 1 * get_var("df") };
      break;
    case "F":
      (df1 = 1 * __$("dfn").value),
        (i = 1 * __$("dfd").value),
        (s = { df1: df1, df2: i });
      break;
    case "R":
      s = {
        df: get_var("alpha__r"),
      };
      degree__of__freedom = get_var("alpha__r");
      break;
    default:
      alert("Wrong distribution Type");
  }
  if (distribution__type == "R") {
    console.log("ASdfasasdfasd");
    // two__1 = InvDistribution(_ / 2, s);
    v__r =
      InvDistribution(distribution__type, (1 - _) / 2, s) /
      Math.sqrt(
        Math.pow(InvDistribution(distribution__type, 1 - _, s), 2) +
        parseFloat(degree__of__freedom)
      );
    console.log(t__pdf(_, parseFloat(degree__of__freedom)));
  }

  two__tailed__critical__area__1 = InvDistribution(
    distribution__type,
    _ / 2,
    s
  );
  two__tailed__critical__area__2 = InvDistribution(
    distribution__type,
    1 - _ / 2,
    s
  );
  two__tailed__critical__val__1 = xrd(two__tailed__critical__area__1, b);
  two__tailed__critical__val__2 = xrd(two__tailed__critical__area__2, b);
  two_tails = "two tails";
  //"RIGHT TAILS"
  right__tailed__area = "infinite";
  right__tailed__area = InvDistribution(distribution__type, 1 - _, s);
  right_probability = 1 - _;
  right__critical__value = xrd(right__tailed__area, b);
  //"LEft TAILS"
  left__tailed__area = "infinite";
  left__tailed__area = InvDistribution(distribution__type, _, s);
  two_tails = "left tail";
  left_probability = _;
  left__critical__value = xrd(left__tailed__area, b);

  critical__values = `<b>
      ${xrd(two__tailed__critical__area__1, b)} 
       &
      ${xrd(two__tailed__critical__area__2, b)} 
      </br>`;
  set_variable("chi__left", left__critical__value);
  set_variable("chi__two", critical__values);
  set_variable("chi__right", right__critical__value);
  document.querySelector(
    ".right__label"
  ).innerHTML = `${distribution__type} Value for <strong>Right Tailed</strong> Critical
Values:`;
  document.querySelector(
    ".left__label"
  ).innerHTML = `${distribution__type} Value for <strong>Left Tailed</strong> Critical
Values:`;
  document.querySelector(
    ".two__label"
  ).innerHTML = `${distribution__type} Value for <strong>Two Tailed</strong> Critical
Values:`;
}

function precision_string($x) {
  if ($x) {
    return round_to_precision($x, precision($x));
  } else {
    return "0";
  }
}

function InvDistribution(e, t, r) {
  var n,
    o = r,
    a = 0,
    i = 0;
  switch (e) {
    case "Chi-Square":
      return chi__inv(t, o.df);
      break;
    case "T":
      return t__inv(t, o.df);
      break;
    case "R":
      return t__inv(t, o.df);
      break;
    case "F":
      return (n = centralF_inv(t, o.df1, o.df2)) || (n = inv_f_approx(t, r)), n;
      break;
    default:
      console.error(
        "Error: you enterd type:" +
        e +
        ' please insert type ("Normal" or "T" or etc)'
      );
      return;
  }

  for (; i < t;) (i += pdf(e, a, r)), (a += 1);
  return a - 1;
}

function chi__inv(p, dof) {
  return 2 * gammapinv(p, 0.5 * dof);
}

function chi__pdf(x, dof) {
  if (x < 0) return 0;
  return x === 0 && dof === 2
    ? 0.5
    : Math.exp(
      (dof / 2 - 1) * Math.log(x) -
      x / 2 -
      (dof / 2) * Math.log(2) -
      gammaln(dof / 2)
    );
}

function t__inv(p, dof) {
  var x = ibetainv(2 * Math.min(p, 1 - p), 0.5 * dof, 0.5);
  x = Math.sqrt((dof * (1 - x)) / x);
  return p > 0.5 ? x : -x;
}

function INV2T(r, n) {
  return Math.abs(t__inv(r / 2, n));
}

function t__pdf(x, dof) {
  dof = dof > 1e100 ? 1e100 : dof;
  return (
    (1 / (Math.sqrt(dof) * betafn(0.5, dof / 2))) *
    Math.pow(1 + (x * x) / dof, -((dof + 1) / 2))
  );
}
function pdf(e, t, r) {
  var n = r;
  t = Number(t);
  var o = 0;
  switch (e) {
    case "Normal":
      normal_pdf(t, n.mean, n.std);
      break;
    case "T":
      t__pdf(t, n.df);
      break;
    case "F":
      t <= 0
        ? (o = 0)
        : (o = centralF_pdf(t, n.df1, n.df2)) ||
        (o = normal_pdf(FtoZ(t, n.df1, n.df2), 0, 1));
      break;
    case "Chi-Square":
      t <= 0
        ? (o = 0)
        : (o = chi__pdf(t, n.df)) ||
        (o = normal_pdf(t, n.df, Math.sqrt(2 * n.df)));
      break;
    case "R":
      t__pdf(t, n.df);
      break;
    default:
      console.error(
        "Error: you enterd type:" +
        e +
        ' please insert type ("Normal" or "T" or etc)'
      );
  }

  return o;
}
(xrd = xround),
  (set_var = set_variable),
  (window.smoothScroll = function (e) {
    var t = e;
    do {
      if (!(t = t.parentNode)) return;
      t.scrollTop += 1;
    } while (0 == t.scrollTop);
    var r = 0;
    do {
      if (e == t) break;
      r += e.offsetTop;
    } while (e == e.offsetParent);
    (scroll = function (e, t, r, n) {
      30 < (n += 1) ||
        ((e.scrollTop = t + ((r - t) / 30) * n),
          setTimeout(function () {
            scroll(e, t, r, n);
          }, 0.001));
    }),
      scroll(t, t.scrollTop, r, 0);
  });
function xround(e, t) {
  if (
    (void 0 === t && (t = 6),
      "string" == typeof t && (t = Number(t)),
      "infinite" == e)
  )
    return "&infin;";
  if ("ninfinite" == e) return "-&infin;";
  var r = Math.log10(1 * Math.abs(e));
  10 < (r = r < 0 ? t : Math.round(r + 0.5) + t) && (r = 10);
  var n = (1 * e).toPrecision(r);
  return "NaN" == (n = (1 * n).toString()) && (n = e), n;
}

function gammapinv(p, a) {
  var j = 0;
  var a1 = a - 1;
  var EPS = 1e-8;
  var gln = gammaln(a);
  var x, err, t, u, pp, lna1, afac;
  if (p >= 1) return Math.max(100, a + 100 * Math.sqrt(a));
  if (p <= 0) return 0;
  if (a > 1) {
    lna1 = Math.log(a1);
    afac = Math.exp(a1 * (lna1 - 1) - gln);
    pp = p < 0.5 ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
    if (p < 0.5) x = -x;
    x = Math.max(
      0.001,
      a * Math.pow(1 - 1 / (9 * a) - x / (3 * Math.sqrt(a)), 3)
    );
  } else {
    t = 1 - a * (0.253 + a * 0.12);
    if (p < t) x = Math.pow(p / t, 1 / a);
    else x = 1 - Math.log(1 - (p - t) / (1 - t));
  }
  for (; j < 12; j++) {
    if (x <= 0) return 0;
    err = lowRegGamma(a, x) - p;
    if (a > 1) t = afac * Math.exp(-(x - a1) + a1 * (Math.log(x) - lna1));
    else t = Math.exp(-x + a1 * Math.log(x) - gln);
    u = err / t;
    x -= t = u / (1 - 0.5 * Math.min(1, u * ((a - 1) / x - 1)));
    if (x <= 0) x = 0.5 * (x + t);
    if (Math.abs(t) < EPS * x) break;
  }
  return x;
}

function gammaln(x) {
  var j = 0;
  var cof = [
    76.18009172947146, -86.50532032941678, 24.01409824083091,
    -1.231739572450155, 0.001208650973866179, -5395239384953e-18,
  ];
  var ser = 1.000000000190015;
  var xx, y, tmp;
  tmp = (y = xx = x) + 5.5;
  tmp -= (xx + 0.5) * Math.log(tmp);
  for (; j < 6; j++) ser += cof[j] / ++y;
  return Math.log((2.5066282746310007 * ser) / xx) - tmp;
}

function lowRegGamma(a, x) {
  var aln = gammaln(a);
  var ap = a;
  var sum = 1 / a;
  var del = sum;
  var b = x + 1 - a;
  var c = 1 / 1e-30;
  var d = 1 / b;
  var h = d;
  var i = 1;
  var ITMAX = -~(Math.log(a >= 1 ? a : 1 / a) * 8.5 + a * 0.4 + 17);
  var an;
  if (x < 0 || a <= 0) {
    return NaN;
  } else if (x < a + 1) {
    for (; i <= ITMAX; i++) {
      sum += del *= x / ++ap;
    }
    return sum * Math.exp(-x + a * Math.log(x) - aln);
  }
  for (; i <= ITMAX; i++) {
    an = -i * (i - a);
    b += 2;
    d = an * d + b;
    c = b + an / c;
    d = 1 / d;
    h *= d * c;
  }
  return 1 - h * Math.exp(-x + a * Math.log(x) - aln);
}

//////////////////////
//F VALUE CALCULATOR//
//////////////////////

function centralF_pdf(x, df1, df2) {
  var p, q, f;
  if (x < 0) return 0;
  if (df1 <= 2) {
    if (x === 0 && df1 < 2) {
      return Infinity;
    }
    if (x === 0 && df1 === 2) {
      return 1;
    }
    return (
      (1 / betafn(df1 / 2, df2 / 2)) *
      Math.pow(df1 / df2, df1 / 2) *
      Math.pow(x, df1 / 2 - 1) *
      Math.pow(1 + (df1 / df2) * x, -(df1 + df2) / 2)
    );
  }
  p = (df1 * x) / (df2 + x * df1);
  q = df2 / (df2 + x * df1);
  f = (df1 * q) / 2;
  return f * binomial_pdf((df1 - 2) / 2, (df1 + df2 - 2) / 2, p);
}

function normal_pdf(x, mean, std) {
  return Math.exp(
    -0.5 * Math.log(2 * Math.PI) -
    Math.log(std) -
    Math.pow(x - mean, 2) / (2 * std * std)
  );
}
function betafn(x, y) {
  if (x <= 0 || y <= 0) return undefined;
  return x + y > 170
    ? Math.exp(betaln(x, y))
    : (gammafn(x) * gammafn(y)) / gammafn(x + y);
}
function betaln(x, y) {
  return gammaln(x) + gammaln(y) - gammaln(x + y);
}
function binomial_pdf(k, n, p) {
  return p === 0 || p === 1
    ? n * p === k
      ? 1
      : 0
    : combination(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}
function combination(n, m) {
  return n > 170 || m > 170
    ? Math.exp(combinationln(n, m))
    : factorial(n) / factorial(m) / factorial(n - m);
}

function combinationln(n, m) {
  return factorialln(n) - factorialln(m) - factorialln(n - m);
}
function factorialln(n) {
  return n < 0 ? NaN : gammaln(n + 1);
}
function factorial(n) {
  return n < 0 ? NaN : gammafn(n + 1);
}
function gammafn(x) {
  var p = [
    -1.716185138865495, 24.76565080557592, -379.80425647094563,
    629.3311553128184, 866.9662027904133, -31451.272968848367,
    -36144.413418691176, 66456.14382024054,
  ];
  var q = [
    -30.8402300119739, 315.35062697960416, -1015.1563674902192,
    -3107.771671572311, 22538.11842098015, 4755.846277527881,
    -134659.9598649693, -115132.2596755535,
  ];
  var fact = false;
  var n = 0;
  var xden = 0;
  var xnum = 0;
  var y = x;
  var i, z, yi, res;
  if (y <= 0) {
    res = (y % 1) + 36e-17;
    if (res) {
      fact = ((!(y & 1) ? 1 : -1) * Math.PI) / Math.sin(Math.PI * res);
      y = 1 - y;
    } else {
      return Infinity;
    }
  }
  yi = y;
  if (y < 1) {
    z = y++;
  } else {
    z = (y -= n = (y | 0) - 1) - 1;
  }
  for (i = 0; i < 8; ++i) {
    xnum = (xnum + p[i]) * z;
    xden = xden * z + q[i];
  }
  res = xnum / xden + 1;
  if (yi < y) {
    res /= yi;
  } else if (yi > y) {
    for (i = 0; i < n; ++i) {
      res *= y;
      y++;
    }
  }
  if (fact) {
    res = fact / res;
  }
  return res;
}

function inv_f_approx(e, t) {
  var r = t,
    n = 2 / (9 * r.df1),
    o = normal__inv(e, 0, 1),
    a = Math.pow(o * Math.sqrt(n) + 1 - n, 3),
    i = r.df1 / 3,
    l = 2 * r.df2 + r.df1 - 2 - (4 * a * r.df1) / 3,
    s = -2 * r.df2 * a;
  return (-l + Math.sqrt(Math.pow(l, 2) - 4 * i * s)) / (2 * i);
}

function centralF_inv(x, df1, df2) {
  return df2 / (df1 * (1 / ibetainv(x, df1 / 2, df2 / 2) - 1));
}

function ibetainv(p, a, b) {
  var EPS = 1e-8;
  var a1 = a - 1;
  var b1 = b - 1;
  var j = 0;
  var lna, lnb, pp, t, u, err, x, al, h, w, afac;
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  if (a >= 1 && b >= 1) {
    pp = p < 0.5 ? p : 1 - p;
    t = Math.sqrt(-2 * Math.log(pp));
    x = (2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t;
    if (p < 0.5) x = -x;
    al = (x * x - 3) / 6;
    h = 2 / (1 / (2 * a - 1) + 1 / (2 * b - 1));
    w =
      (x * Math.sqrt(al + h)) / h -
      (1 / (2 * b - 1) - 1 / (2 * a - 1)) * (al + 5 / 6 - 2 / (3 * h));
    x = a / (a + b * Math.exp(2 * w));
  } else {
    lna = Math.log(a / (a + b));
    lnb = Math.log(b / (a + b));
    t = Math.exp(a * lna) / a;
    u = Math.exp(b * lnb) / b;
    w = t + u;
    if (p < t / w) x = Math.pow(a * w * p, 1 / a);
    else x = 1 - Math.pow(b * w * (1 - p), 1 / b);
  }
  afac = -gammaln(a) - gammaln(b) + gammaln(a + b);
  for (; j < 10; j++) {
    if (x === 0 || x === 1) return x;
    err = ibeta(x, a, b) - p;
    t = Math.exp(a1 * Math.log(x) + b1 * Math.log(1 - x) + afac);
    u = err / t;
    x -= t = u / (1 - 0.5 * Math.min(1, u * (a1 / x - b1 / (1 - x))));
    if (x <= 0) x = 0.5 * (x + t);
    if (x >= 1) x = 0.5 * (x + t + 1);
    if (Math.abs(t) < EPS * x && j > 0) break;
  }
  return x;
}

function ibeta(x, a, b) {
  var bt =
    x === 0 || x === 1
      ? 0
      : Math.exp(
        gammaln(a + b) -
        gammaln(a) -
        gammaln(b) +
        a * Math.log(x) +
        b * Math.log(1 - x)
      );
  if (x < 0 || x > 1) return false;
  if (x < (a + 1) / (a + b + 2)) return (bt * betacf(x, a, b)) / a;
  return 1 - (bt * betacf(1 - x, b, a)) / b;
}
function betacf(x, a, b) {
  var fpmin = 1e-30;
  var m = 1;
  var qab = a + b;
  var qap = a + 1;
  var qam = a - 1;
  var c = 1;
  var d = 1 - (qab * x) / qap;
  var m2, aa, del, h;
  if (Math.abs(d) < fpmin) d = fpmin;
  d = 1 / d;
  h = d;
  for (; m <= 100; m++) {
    m2 = 2 * m;
    aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < fpmin) d = fpmin;
    c = 1 + aa / c;
    if (Math.abs(c) < fpmin) c = fpmin;
    d = 1 / d;
    del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 3e-7) break;
  }
  return h;
}

//////////////////////////////
//Helper Functions for Z Value
//////////////////////////////

function normal__inv(p, mean, std) {
  return -1.4142135623730951 * std * erfcinv(2 * p) + mean;
}
function erfcinv(p) {
  var j = 0;
  let x, err, t, pp;
  if (p >= 2) return -100;
  if (p <= 0) return 100;
  pp = p < 1 ? p : 2 - p;
  t = Math.sqrt(-2 * Math.log(pp / 2));
  x =
    -0.70711 *
    ((2.30753 + t * 0.27061) / (1 + t * (0.99229 + t * 0.04481)) - t);
  for (; j < 2; j++) {
    err = erfc(x) - pp;
    x += err / (1.1283791670955126 * Math.exp(-x * x) - x * err);
  }
  return p < 1 ? x : -x;
}
function erfc(x) {
  return 1 - erf(x);
}

function erf(x) {
  var cof = [
    -1.3026537197817094, 0.6419697923564902, 0.019476473204185836,
    -0.00956151478680863, -0.000946595344482036, 0.000366839497852761,
    42523324806907e-18, -20278578112534e-18, -1624290004647e-18,
    130365583558e-17, 1.5626441722e-8, -8.5238095915e-8, 6.529054439e-9,
    5.059343495e-9, -9.91364156e-10, -2.27365122e-10, 96467911e-18, 2394038e-18,
    -6886027e-18, 894487e-18, 313092e-18, -112708e-18, 381e-18, 7106e-18,
    -1523e-18, -94e-18, 121e-18, -28e-18,
  ];
  var j = cof.length - 1;
  var isneg = false;
  var d = 0;
  var dd = 0;
  var t, ty, tmp, res;
  if (x < 0) {
    x = -x;
    isneg = true;
  }
  t = 2 / (2 + x);
  ty = 4 * t - 2;
  for (; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }
  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
}
