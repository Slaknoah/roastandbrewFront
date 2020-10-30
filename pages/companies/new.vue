<template>
  <div>
    <div v-show="processing" class="z-modal fixed bg-opacity-75 bg-white top-0 right-0 left-0 bottom-0 flex items-center justify-center">
        <img src="/img/ui/loader.svg"/>
    </div>
    <div class="flex flex-col pb-10 pt-10 w-full mx-auto max-w-screen-lg">
      <div class="px-4 sm:px-6 flex items-center justify-between">
        <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
          New Company
        </h1>
      </div>

      <div class="mt-4 flex justify-between flex-wrap overflow-x-auto pt-2 px-4 sm:px-6 lg:flex-wrap">
        <form class="w-full mx-auto sm:border md:rounded-lg mt-7.5 sm:p-10">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                Name
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3
                              leading-tight focus:outline-none focus:bg-white"
                      :class="{ 'border-red-500': !validations.name }"
                      id="grid-name"
                      v-model="form.name"
                      type="text"
                      placeholder="Koch-Vandervort">
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-5">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Header Image</label>
              <div class="flex flex-col">
                  <img src="/img/placeholders/banner.svg" class="w-64 mb-3 pointer-events-none" v-show="!showHeaderPreview"/>
                  <img class="block w-64 mb-3 pointer-events-none" v-show="showHeaderPreview" :src="headerPreview"/>

                  <div class="flex flex-col">
                      <div class="flex items-center">
                          <a class="py-2 px-6 px-text-base text-black uppercase border-2 border-black rounded cursor-pointer mr-3" v-on:click="chooseCompanyHeader()">
                              Choose Image
                          </a>

                          <a v-on:click="deleteCompanyHeader()" class="underline text-red-400 cursor-pointer">
                              Delete Image
                          </a>
                      </div>
                      <div class="flex text-gray-500 text-base">
                            <input ref="headerFile" v-on:change="handleCompanyHeaderUpload()" accept="image/*" id="companyHeader" type="file"/>
                          1200px by 600px or larger reccommended.
                      </div>
                  </div>
              </div>
              <div v-show="!validations.header" class="mt-1 text-alertRed text-sm">A header must be uploaded!</div>
            </div>

            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Logo</label>
              <div class="flex flex-col">
                  <img src="/img/placeholders/logo.svg" class="w-24 mb-10 h-24 mr-3 pointer-events-none" v-show="!showLogoPreview"/>
                  <img class="block w-24 h-24 mr-3 mb-5 pointer-events-none" v-show="showLogoPreview" :src="logoPreview"/>

                  <div class="flex flex-col">
                      <div class="flex items-center">
                          <a class="py-2 px-6 px-text-base text-black uppercase border-2 border-black rounded cursor-pointer mr-3" v-on:click="chooseCompanyLogo()">
                              Choose Image
                          </a>

                          <a v-on:click="deleteCompanyLogo()" class="underline text-red-400 cursor-pointer">
                              Delete Image
                          </a>
                      </div>
                      <div class="flex text-gray-500 text-base">
                          <input ref="logoFile" v-on:change="handleCompanyLogoUpload()" accept="image/*" id="companyLogo" type="file"/>
                          225px by 225px or larger reccommended.
                      </div>
                  </div>
              </div>
              <div v-show="!validations.logo" class="mt-1 text-alertRed text-sm">A logo must be uploaded!</div>
            </div>
          </div>

          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-description">
                Description
              </label>
              <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        rows="8"
                        v-model="form.description"
                        id="grid-description">
              </textarea>
              <p class="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-2">Location</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                Country
              </label>
              <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700
                                py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-country"
                        :class="{ 'border-red-500': !validations.country }"
                        v-model="form.country">
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarctica</option>
                  <option value="AG">Antigua and Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Armenia</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="AZ">Azerbaijan</option>
                  <option value="BS">Bahamas</option>
                  <option value="BH">Bahrain</option>
                  <option value="BD">Bangladesh</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Belarus</option>
                  <option value="BE">Belgium</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermuda</option>
                  <option value="BT">Bhutan</option>
                  <option value="BO">Bolivia, Plurinational State of</option>
                  <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                  <option value="BA">Bosnia and Herzegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvet Island</option>
                  <option value="BR">Brazil</option>
                  <option value="IO">British Indian Ocean Territory</option>
                  <option value="BN">Brunei Darussalam</option>
                  <option value="BG">Bulgaria</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="KH">Cambodia</option>
                  <option value="CM">Cameroon</option>
                  <option value="CA">Canada</option>
                  <option value="CV">Cape Verde</option>
                  <option value="KY">Cayman Islands</option>
                  <option value="CF">Central African Republic</option>
                  <option value="TD">Chad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">China</option>
                  <option value="CX">Christmas Island</option>
                  <option value="CC">Cocos (Keeling) Islands</option>
                  <option value="CO">Colombia</option>
                  <option value="KM">Comoros</option>
                  <option value="CG">Congo</option>
                  <option value="CD">Congo, the Democratic Republic of the</option>
                  <option value="CK">Cook Islands</option>
                  <option value="CR">Costa Rica</option>
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="HR">Croatia</option>
                  <option value="CU">Cuba</option>
                  <option value="CW">Curaçao</option>
                  <option value="CY">Cyprus</option>
                  <option value="CZ">Czech Republic</option>
                  <option value="DK">Denmark</option>
                  <option value="DJ">Djibouti</option>
                  <option value="DM">Dominica</option>
                  <option value="DO">Dominican Republic</option>
                  <option value="EC">Ecuador</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">El Salvador</option>
                  <option value="GQ">Equatorial Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonia</option>
                  <option value="ET">Ethiopia</option>
                  <option value="FK">Falkland Islands (Malvinas)</option>
                  <option value="FO">Faroe Islands</option>
                  <option value="FJ">Fiji</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="GF">French Guiana</option>
                  <option value="PF">French Polynesia</option>
                  <option value="TF">French Southern Territories</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambia</option>
                  <option value="GE">Georgia</option>
                  <option value="DE">Germany</option>
                  <option value="GH">Ghana</option>
                  <option value="GI">Gibraltar</option>
                  <option value="GR">Greece</option>
                  <option value="GL">Greenland</option>
                  <option value="GD">Grenada</option>
                  <option value="GP">Guadeloupe</option>
                  <option value="GU">Guam</option>
                  <option value="GT">Guatemala</option>
                  <option value="GG">Guernsey</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM">Heard Island and McDonald Islands</option>
                  <option value="VA">Holy See (Vatican City State)</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hong Kong</option>
                  <option value="HU">Hungary</option>
                  <option value="IS">Iceland</option>
                  <option value="IN">India</option>
                  <option value="ID">Indonesia</option>
                  <option value="IR">Iran, Islamic Republic of</option>
                  <option value="IQ">Iraq</option>
                  <option value="IE">Ireland</option>
                  <option value="IM">Isle of Man</option>
                  <option value="IL">Israel</option>
                  <option value="IT">Italy</option>
                  <option value="JM">Jamaica</option>
                  <option value="JP">Japan</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordan</option>
                  <option value="KZ">Kazakhstan</option>
                  <option value="KE">Kenya</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Korea, Democratic People's Republic of</option>
                  <option value="KR">Korea, Republic of</option>
                  <option value="KW">Kuwait</option>
                  <option value="KG">Kyrgyzstan</option>
                  <option value="LA">Lao People's Democratic Republic</option>
                  <option value="LV">Latvia</option>
                  <option value="LB">Lebanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Liberia</option>
                  <option value="LY">Libya</option>
                  <option value="LI">Liechtenstein</option>
                  <option value="LT">Lithuania</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MO">Macao</option>
                  <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                  <option value="MG">Madagascar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malaysia</option>
                  <option value="MV">Maldives</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshall Islands</option>
                  <option value="MQ">Martinique</option>
                  <option value="MR">Mauritania</option>
                  <option value="MU">Mauritius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexico</option>
                  <option value="FM">Micronesia, Federated States of</option>
                  <option value="MD">Moldova, Republic of</option>
                  <option value="MC">Monaco</option>
                  <option value="MN">Mongolia</option>
                  <option value="ME">Montenegro</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Morocco</option>
                  <option value="MZ">Mozambique</option>
                  <option value="MM">Myanmar</option>
                  <option value="NA">Namibia</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepal</option>
                  <option value="NL">Netherlands</option>
                  <option value="NC">New Caledonia</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NI">Nicaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigeria</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk Island</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="NO">Norway</option>
                  <option value="OM">Oman</option>
                  <option value="PK">Pakistan</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestinian Territory, Occupied</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua New Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Philippines</option>
                  <option value="PN">Pitcairn</option>
                  <option value="PL">Poland</option>
                  <option value="PT">Portugal</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="QA">Qatar</option>
                  <option value="RE">Réunion</option>
                  <option value="RO">Romania</option>
                  <option value="RU">Russian Federation</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Saint Barthélemy</option>
                  <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                  <option value="KN">Saint Kitts and Nevis</option>
                  <option value="LC">Saint Lucia</option>
                  <option value="MF">Saint Martin (French part)</option>
                  <option value="PM">Saint Pierre and Miquelon</option>
                  <option value="VC">Saint Vincent and the Grenadines</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Sao Tome and Principe</option>
                  <option value="SA">Saudi Arabia</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Serbia</option>
                  <option value="SC">Seychelles</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapore</option>
                  <option value="SX">Sint Maarten (Dutch part)</option>
                  <option value="SK">Slovakia</option>
                  <option value="SI">Slovenia</option>
                  <option value="SB">Solomon Islands</option>
                  <option value="SO">Somalia</option>
                  <option value="ZA">South Africa</option>
                  <option value="GS">South Georgia and the South Sandwich Islands</option>
                  <option value="SS">South Sudan</option>
                  <option value="ES">Spain</option>
                  <option value="LK">Sri Lanka</option>
                  <option value="SD">Sudan</option>
                  <option value="SR">Suriname</option>
                  <option value="SJ">Svalbard and Jan Mayen</option>
                  <option value="SZ">Swaziland</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="SY">Syrian Arab Republic</option>
                  <option value="TW">Taiwan, Province of China</option>
                  <option value="TJ">Tajikistan</option>
                  <option value="TZ">Tanzania, United Republic of</option>
                  <option value="TH">Thailand</option>
                  <option value="TL">Timor-Leste</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad and Tobago</option>
                  <option value="TN">Tunisia</option>
                  <option value="TR">Turkey</option>
                  <option value="TM">Turkmenistan</option>
                  <option value="TC">Turks and Caicos Islands</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="UA">Ukraine</option>
                  <option value="AE">United Arab Emirates</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US">United States</option>
                  <option value="UM">United States Minor Outlying Islands</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistan</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela, Bolivarian Republic of</option>
                  <option value="VN">Viet Nam</option>
                  <option value="VG">Virgin Islands, British</option>
                  <option value="VI">Virgin Islands, U.S.</option>
                  <option value="WF">Wallis and Futuna</option>
                  <option value="EH">Western Sahara</option>
                  <option value="YE">Yemen</option>
                  <option value="ZM">Zambia</option>
                  <option value="ZW">Zimbabwe</option>

                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                City
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      :class="{ 'border-red-500': !validations.city }"
                      id="grid-city"
                      type="text"
                      v-model="form.city"
                      placeholder="Albuquerque">
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2" v-show="form.country == 'US'">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                State
              </label>
              <div class="relative">
                <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700
                                py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        :class="{ 'border-red-500': !validations.state }"
                        v-model="form.state">
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                Address
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-address"
                      type="text"
                      :class="{ 'border-red-500': !validations.address }"
                      v-model="form.address"
                      placeholder="711-2880 Nulla St.">
            </div>

            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                Zip
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200
                              rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-zip"
                      type="text"
                      :class="{ 'border-red-500': !validations.zip }"
                      v-model="form.zip"
                      placeholder="90210">
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-2">Online Presence</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-website">
                Website
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-website"
                      type="text"
                      v-model="form.website"
                      placeholder="https://voch-vandervort.com">
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-facebook">
                Facebook Url
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-facebook"
                      type="text"
                      v-model="form.facebook_url"
                      placeholder="https://facebook.com">
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-twitter">
                Twitter Url
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                              px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-twitter"
                      type="text"
                      v-model="form.twitter_url"
                      placeholder="https://twitter.com">
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-instagram">
                Instagram Url
              </label>
              <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded
                              py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-instagram"
                      type="text"
                      v-model="form.instagram_url"
                      placeholder="https://instagram.com">
            </div>
          </div>

          <div class="text-gray-700 text-xl font-bold mb-4">Services Offered</div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base">This company roasts its own coffee</span>
                <input type="checkbox" v-model="form.roaster"> <span class="roast-checkmark"></span>
              </label>
            </div>
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="roast-checkbox-container flex items-center">
                <span class="font-sans-lato text-base">Coffee is available via subscription.</span>
                <input type="checkbox" v-model="form.subscription"> <span class="roast-checkmark"></span>
              </label>
            </div>
          </div>

          <button type="button"
                  class="float-right inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5
                          font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none
                          focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
                  @click.prevent="saveCompany">
            <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd" />
            </svg>
            Save
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'App',
  middleware: 'auth',
  data() {
    return {
      processing: false,

      logoPreview: '',
      showLogoPreview: false,

      headerPreview: '',
      showHeaderPreview: false,

      form: {
        name: '',
        roaster: 0,
        subscription: 0,
        description: '',
        website: '',
        address: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        facebook_url: '',
        twitter_url: '',
        instagram_url: '',
        header: '',
        logo: ''
      },

      validations: {
        name: true,
        city: true,
        country: true,
        state: true,
        address: true,
        zip: true,
        header: true,
        logo: true
      },
    }
  },
  methods: {
    validateNewCompany() {
      if ( this.form.name == '' ) {
        this.validations.name = false;
      } else {
        this.validations.name = true;
      }

      if ( this.form.country == '' ) {
        this.validations.country = false;
      } else {
        this.validations.country = true;
      }

      if ( this.form.city == '' ) {
        this.validations.city = false;
      } else {
        this.validations.city = true;
      }

      if ( this.form.country == 'US' && this.form.state == '' ) {
        this.validations.state = false;
      } else {
        this.validations.state = true;
      }

      if ( this.form.zip == '' ) {
        this.validations.zip = false;
      } else {
        this.validations.zip = true;
      }

      if ( this.form.address == '' ) {
        this.validations.address = false;
      } else {
        this.validations.address = true;
      }

      return ( this.validations.name && this.validations.city && this.validations.state ) ? true : false;
    },

    chooseCompanyLogo() {
      this.$refs.logoFile.click();
    },

    handleCompanyLogoUpload() {
      this.form.logo = this.$refs.logoFile.files;
      let reader = new FileReader();

      reader.addEventListener( 'load', function() {
        this.showLogoPreview = true;
        this.logoPreview = reader.result;
      }.bind( this ), false );

      if ( this.form.logo ) {
        if ( /\.(jpe?g|png|gif)$/i.test( this.form.logo[0].name ) ) {
          reader.readAsDataURL( this.form.logo[0] );
        }
      }
    },

    deleteCompanyLogo() {
      this.form.logo = '';
      this.showLogoPreview = false;
      this.logoPreview = '';
    },

    chooseCompanyHeader() {
      this.$refs.headerFile.click();
    },

    handleCompanyHeaderUpload() {
      this.processing = true;
      this.form.header = this.$refs.headerFile.files;
      let reader = new FileReader();

      reader.addEventListener( 'load', function() {
        this.showHeaderPreview = true;
        this.headerPreview = reader.result;
        this.processing = false;
      }.bind( this ), false );

      if ( this.form.header ) {
        if ( /\.(jpe?g|png|gif)$/i.test( this.form.header[0].name ) ) {
          reader.readAsDataURL( this.form.header[0] );
        }
      }
    },

    deleteCompanyHeader() {
      this.form.header = '';
      this.showHeaderPreview = false;
      this.headerPreview = '';
    },

    async saveCompany() {
      this.processing = true;

      if ( this.validateNewCompany() ) {
        try {
          let formData = this.transformToFormData( this.form );
          await this.$api.companies.store( formData )
            .then( function( company ) {
                this.processing = false;
                this.$router.push({
                  path: `/companies/${ company.slug }`
                });
            }.bind( this ) );
        } catch( error ) {
          console.log( error );
        }
      } else {
        this.processing = false;
      }
    },

    transformToFormData( fields ) {
      let fileKeys = [ 'header', 'logo' ];
      let formData = new FormData();

      for ( let [ key, value ] of Object.entries( fields ) ) {
        if ( fileKeys.indexOf(key) > -1 ) {
          if ( value !== '' ) {
            formData.append( key, value[0] );
          }
        } else {
          if ( typeof(value) === "boolean" ) {
            value = value ? 1 : 0;
          }
          formData.append( key, value );
        }
      }

      return formData;
    }
  }
}
</script>

<style scoped>
    input[type="file"]{
        position: absolute;
        top: -5000px;
    }
</style>
