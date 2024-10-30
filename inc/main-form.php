<main class="main_container">
  <div class="bg"></div>
  <div class="critical__header">
    <a href="#">
      <h4 class="page__title">Critical Value Calculator</h4>
    </a>
  </div>

  <section class="main__section">
    <!------------------------->
    <!--------NAVIGATION------->
    <!------------------------->
    <div class="input__type">
      <h5>Calculator for:</h5>
      <button id="tvalue" class="navigate_btn active" data-target="critical_value_t_form">
        <strong>T</strong> Critical Value
      </button>
      <button id="zvalue" data-target="z_value" class="navigate_btn">
        <strong>Z</strong> Critical Value
      </button>
      <button class="navigate_btn" id="chi__value" data-target="critical_value_chi_form">
        <strong>Chi</strong>-Square Value
      </button>
      <button data-target="critical_value_f_form" class="navigate_btn">
        <strong>F</strong> Critical Value
      </button>
      <button data-target="critical_value_r_form" class="navigate_btn">
        <strong>R</strong> Critical Value
      </button>
      <input type="hidden" name="calculation__type" value="critical_value_t_form" id="calculation__type__critical" />
    </div>
    <div>
      <!----------------------------------------------->
      <!--------Critical Value T Calculator Form------->
      <!----------------------------------------------->
      <form action="" class="input__form" id="critical_value_t_form">
        <div class="form_crititcal">
          <label for="">Significance Level α: (0 to 0.5)</label>
          <input type="number" name="significance__level" min="0" max="0.5" id="significance__level__t" step="0.01" class="freq" value="0.05" />
        </div>
        <div class="form_crititcal">
          <label for="">Degrees of Freedom:</label>
          <input type="number" name="significance__level" min="0" max="360" id="degree__of__freedom__t" class="freq" value="45" />
        </div>
        <div class="form_crititcal submit__btns__critical">
          <input class="freq calculate_btn" type="submit" value="Calculate" data-result="t_value_results" id="calculate" />
        </div>
      </form>
      <!----------------------------------------------->
      <!--------Critical Value Z Calculator Form------->
      <!----------------------------------------------->
      <form class="c_value input__form" id="z_value" style="display: none">
        <div class="form_crititcal">
          <label>Significance Level α: (0 to 1)</label>
          <input type="number" step="0.1" class="form-control freq" value="0.3" min="0" max="1" onkeydown="if (event.keyCode === 13) {calculateZ(); return false;}" placeholder="0 to 1" id="pva" />
        </div>
        <div class="form_crititcal submit__btns__critical">
          <input type="submit" data-result="z_value_results" class="calculate_btn" value="Calculate" />
        </div>
      </form>
      <!----------------------------------------------->
      <!--------Critical Value Chi-Square Calculator Form------->
      <!----------------------------------------------->
      <form action="" class="input__form" style="display: none" id="critical_value_chi_form">
        <div class="form_crititcal">
          <label for="">Significance Level α: (0 to 0.5)</label>
          <input type="number" name="significance__level" min="0" max="0.5" id="alpha" step="0.01" class="freq" value="0.15" />
        </div>
        <div class="form_crititcal">
          <label for="">Degrees of Freedom:</label>
          <input type="number" name="significance__level" min="0" id="df" class="freq" value="25" />
        </div>
        <div class="form_crititcal submit__btns__critical">
          <input class="freq calculate_btn" type="submit" data-result="chi-results" value="Calculate" id="calculate__chi" />
        </div>
      </form>
      <!----------------------------------------------->
      <!--------Critical Value F Calculator Form------->
      <!----------------------------------------------->
      <form action="" class="input__form" style="display: none" id="critical_value_f_form">
        <div class="form_crititcal">
          <label for="alpha">Significance Level α: (0 to 0.5)</label>
          <input type="number" name="significance__level" min="0" max="0.5" id="alpha__chi" step="0.01" class="freq" value="0.15" />
        </div>
        <div class="form_crititcal">
          <label for="df">Degrees of Freedom - numerator:</label>
          <input type="number" name="significance__level" min="0" id="dfn" class="freq" value="7" />
        </div>
        <div class="form_crititcal">
          <label for="df2">Degrees of Freedom - denominator:</label>
          <input type="number" name="significance__level" min="0" id="dfd" class="freq" value="13" />
        </div>
        <div class="form_crititcal submit__btns__critical">
          <input class="freq calculate_btn" type="submit" data-result="chi-results" value="Calculate" id="calculate__chi" />
        </div>
      </form>
      <!----------------------------------------------->
      <!--------Critical Value R Calculator Form------->
      <!----------------------------------------------->
      <form action="" class="input__form" style="display: none" id="critical_value_r_form">
        <div class="form_crititcal">
          <label for="alpha">Significance Level α: (0 to 0.5)</label>
          <input type="number" name="significance__level" min="0" max="0.5" id="alpha__r" step="0.01" class="freq" value="0.15" />
        </div>
        <div class="form_crititcal">
          <label for="df">Degrees of Freedom:</label>
          <input type="number" name="significance__level" min="0" id="dfr" class="freq" value="7" />
        </div>
        <div class="form_crititcal submit__btns__critical">
          <input class="freq calculate_btn" type="submit" data-result="r-results" value="Calculate" id="calculate__r" />
        </div>
      </form>
      <!---------------------->
      <!--------RESULTS------->
      <!---------------------->
      <div class="card" id="tool_result" style="display: none">
        <div class="card-body">
          <!-------------------------------------->
          <!--------Critical Value T Results------>
          <!-------------------------------------->
          <p id="result__header">T Critical Value</p>
          <div class="c_value_results results" id="t_value_results" style="display: none">
            <div>
              <label>T Value for Right Tailed Probability:</label>
              <input type="text" class="form-control" readonly id="a1hname" />
            </div>
            <div>
              <label>T Value for Left Tailed Probability:</label>
              <input type="text" class="form-control" readonly id="a3hname" />
            </div>
            <div>
              <label>T Value for Two Tailed Probability:</label>
              <input type="text" class="form-control" readonly id="a2hname" />
            </div>
          </div>
          <!-------------------------------------->
          <!--------Critical Value Z Results------>
          <!-------------------------------------->
          <div class="c_value_results results" id="z_value_results" style="display: none">
            <div>
              <label>Z Value for Two Tailed Probability:</label>
              <input type="text" readonly class="small" id="a2hname2" />
            </div>
            <div>
              <label>Z Value for Right Tailed Probability:</label>
              <input type="text" readonly id="a1hname2" />
            </div>
            <div>
              <label>Z Value for Left Tailed Probability:</label>
              <input type="text" readonly id="a3hname2" />
            </div>
          </div>
          <!-------------------------------------->
          <!--------Chi-Square Value Results------>
          <!-------------------------------------->
          <div id="chi-results" class="results c_value_results" style="display: none">
            <!-- <div>
                <label>Critical Values are:</label>
                <span id="chi__critical"> </span>
              </div> -->
            <div>
              <label class="right__label">Chi-Square Value for <strong>Right Tailed</strong> Critical
                Values:</label>
              <span id="chi__right"> </span>
            </div>
            <div>
              <label class="left__label">Chi-Square Value for <strong>Left Tailed</strong> Critical
                Values:</label>
              <span id="chi__left"></span>
            </div>
            <div>
              <label class="two__label">Chi-Square Value for <strong>Two Tailed</strong> Critical
                Values:</label>
              <span id="chi__two" class="small"></span>
            </div>
          </div>
          <!-------------------------------------->
          <!--------Critical Value of R Results------>
          <!-------------------------------------->
          <div id="r-results" class="results c_value_results" style="display: none">
            <!-- <div>
                <label>Critical Values are:</label>
                <span id="chi__critical"> </span>
              </div> -->
            <div>
              <label>R Value for <strong>Right Tailed</strong> Critical
                Values:</label>
              <span id="r__right"> </span>
            </div>
            <div>
              <label>R Value for <strong>Left Tailed</strong> Critical
                Values:</label>
              <span id="r__left"></span>
            </div>
            <div>
              <label>R Value for <strong>Two Tailed</strong> Critical Values:</label>
              <span id="r__two"></span>
            </div>
          </div>
          <!--------------->
          <!--RESULTS END-->
          <!--------------->
        </div>
      </div>
      <div id="reset__btn" style="display: none" class="submit__btns__critical reset__btn">
        <input type="reset" value="Reset" />
      </div>
    </div>
  </section>
</main>