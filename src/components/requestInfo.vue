<template>
    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-md-12  col-lg-11">
                <section>
                    <form @submit.prevent="regSubmit">
                        <div class="row">
                            <div class="col-xs-12">
                                <h2 class="header">ინფორმაციის მოთხოვნა</h2>
                            </div>
                        </div>


                        <div class="row ">
                            <div class="col-xs-12 col-md-6  ">
                                <ui-textbox
                                        help="სახელი (ქართულად)"
                                        v-validate="{required: true, min:2, regex: /^([\-ა-ჰ]+)$/}"
                                        :invalid="errors.has('firstName')"
                                        :error="errors.first('firstName')"
                                        v-model="firstName"
                                        autocomplete="off"
                                        name="firstName">
                                </ui-textbox>

                            </div>
                            <div class="col-xs-12 col-md-6 ">
                                <ui-textbox
                                        help="გვარი (ქართულად)"
                                        v-validate="{required: true, min:2, regex: /^([\-ა-ჰ]+)$/} "
                                        :invalid="errors.has('lastName')"
                                        :error="errors.first('lastName')"
                                        v-model="lastName"
                                        autocomplete="off"
                                        name="lastName">
                                </ui-textbox>
                            </div>

                        </div>
                        <div class="row ">
                            <div class="col-xs-12  col-md-6 ">
                                <ui-textbox
                                        help="პირადი ნომერი"
                                        :invalid="errors.has('IDNum')"
                                        :error="errors.first('IDNum')"
                                        v-validate="{required: true,regex:/^[0-9]{11}$/ }"
                                        name="IDNum"
                                        autocomplete="off"
                                        v-model="IDNum">
                                </ui-textbox>
                            </div>
                            <div class="col-xs-12  col-md-6  ">
                                <ui-textbox
                                        :invalid="errors.has('mobilePhone')"
                                        :error="errors.first('mobilePhone')"
                                        v-validate="{required:true , regex:/^5[0-9]{8}$/}"
                                        name="mobilePhone"
                                        help="მობილურის ნომერი (5XXYYYYYY)"
                                        autocomplete="off"
                                        v-model="mobilePhone">
                                </ui-textbox>
                            </div>
                        </div>
                        <!--<div class="col-xs-12  col-md-6  ">
                            <ui-textbox
                                    help="დაბადების თარიღი (DD/MM/YYYY)"
                                    :invalid="errors.has('birthDate')"
                                    :error="errors.first('birthDate')"
                                    v-validate="'required|date_format:DD/MM/YYYY'"
                                    name="birthDate"
                                    v-model="birthDate">
                            </ui-textbox>
                        </div>-->

                        <div class="row">
                            <div class="col-xs-12  col-md-6  ">
                                <ui-textbox
                                        :invalid="errors.has('email')"
                                        :error="errors.first('email')"
                                        v-validate="'required|email'"
                                        name="email"
                                        help="ელ. ფოსტა"
                                        autocomplete="off"
                                        v-model="email">
                                </ui-textbox>
                            </div>
                            <div class="col-xs-12  col-md-6  ">
                                <ui-textbox
                                        :invalid="errors.has('address')"
                                        :error="errors.first('address')"
                                        v-validate="'required'"
                                        name="address"
                                        help="მისამართი"
                                        data-vv-as="მისამართი"
                                        autocomplete="off"
                                        v-model="address">
                                </ui-textbox>
                            </div>

                        </div>

                        <hr>
                        <div class="row">
                            <div class="col-xs">
                                <ui-textbox
                                        enforce-maxlength
                                        help="მაქსიმუმ 2000 სიმბოლო"
                                        label="აღწერეთ ინფორმაცია, რომლის მიღებაც გსურთ"
                                        data-vv-as = "მოთხოვნილი ინფორმაცია"
                                        :multi-line="true"
                                        :maxlength="2048"
                                        name="requestText"
                                        :invalid="errors.has('requestText')"
                                        :error="errors.first('requestText')"
                                        v-validate="{required:true}"
                                        v-model="requestText">

                                </ui-textbox>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs">
                                <br>
                               <ui-fileupload name="requestFile" @change="fileAttached">
                                   ატვირთეთ მოთხოვნის ფაილი
                               </ui-fileupload>
                            </div>
                        </div>

                        <div class="row">

                            <!--   <div class="col-xs-6 " style="text-align: left">
                                   <ui-button color="primary" @click="prevPage" button-type="button"
                                              icon="arrow_back_ios">

                                       დაბრუნება
                                   </ui-button>
                               </div>-->
                            <div class="col-xs end-xs">
                                <ui-button color="primary" icon-position="right" icon="send">
                                    მოთხოვნის გადაგზავნა
                                </ui-button>
                            </div>
                        </div>
                    </form>
                    <br>
                    <ui-alert type="success" v-show="alertSuccess" dismissable="false">
                        მონაცემები დამახსოვრებულია.
                    </ui-alert>
                </section>
            </div>
        </div>

        <modal-message ref="errors-modal" :error-messages="errorMessages"
                       info="გადაამოწმეთ შეტანილი ინფორმაცია"></modal-message>
    </div>
</template>

<script>
    import mixinErrors from './mixinErrors'

    import modalMessage from './modalMessage'
    import UiFileupload from "keen-ui/src/UiFileupload";


    export default {
        name: "requestInfo",
        components: {
            'modal-message': modalMessage,
        },
        mixins: [mixinErrors],
        data: function () {
            return {
                lastName: '',
                firstName: '',
                IDNum: '',
                mobilePhone: '',
                birthDate: '',
                email: '',
                address:"",
                requestText: "",
                uploadedFile:"",

                alertSuccess: false,


            }
        },
        methods: {
            async regSubmit() {
                try {
                    let validationResult = await this.$validator.validateAll();
                    if (validationResult) {
                        let {email, IDNum, lastName, firstName, mobilePhone, requestText, address} = this.$data;

                        let formData = new FormData();


                        formData.append("LastName",lastName);
                        formData.append("FirstName",firstName);
                        formData.append("IDNum",IDNum);
                        formData.append("Mail",email);
                        formData.append("MailBody",requestText);
                        formData.append("MobilePhone",mobilePhone);
                        formData.append("StreetAddress",address);
                        formData.append("AttachmentUrl","");
                        formData.append("AttachmentFile",this.uploadedFile);

                        let postRes = await this.$axios.post(this.$globalState.apiUrl + '/PostVisitors', formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });

                        let results = postRes.data;



                        if (Math.floor(postRes.status/100)!==2) {
                            this.showErrors()
                        } else {
                            this.alertSuccess=true;
                            setTimeout(()=>{
                                this.$router.push("/");
                            },2000)

                        }
                    } else {
                        this.showErrors('')
                    }
                } catch (err) {
                    this.showErrors("შეცდომაა მონაცემების დამუშავების დროს. ")
                }
            },
            fileAttached(files)
            {
                this.uploadedFile = files[0];
            }


        }
    }
</script>

<style scoped>

</style>