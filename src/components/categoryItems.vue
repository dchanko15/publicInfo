<template>

    <div>
        <div class="row center-xs">
            <div class="col-xs-12 col-sm-12 col-lg-11 ">
                <section>
                    <!--<div class="row">
                        <div class="col-xs">
                            <div class="float-left">
                                <ui-icon-button button-type="button" type="primary" color="primary"
                                                icon="arrow_back"
                                                tooltip="დაბრუნება" @click="$router.back();">

                                </ui-icon-button>

                            </div>
                        </div>
                    </div>-->
                    <div class="row">
                        <div class="col-xs-1 col-sm-1 end-xs">

                            <h4>{{subCategory}} </h4>
                        </div>
                        <div class="col-xs">
                            <h4>{{subCategoryName}} </h4>
                        </div>

                    </div>

                    <div v-for="item in items" :key="item.Id" class="row">
                        <div class="col-xs col-xs-offset-1" style="padding: 1em">
                            <div>{{item.PublishDate}}</div>
                            <a target="_blank" :href="$globalState.baseUrl+  item.Url">
                                {{item.Name}}
                            </a>
                        </div>
                    </div>

                </section>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "categoryItems",
        props: ['subCategoryId'],
        data: () => {
            return {
                subCategory: "",
                subCategoryName: "",
                items: []
            }
        },
        created() {
            let id = this.subCategoryId;
            let subCat = this.$globalState.subCategories.find(sc => sc.Id.toString() === id);
            this.subCategory = subCat.SubCategory;
            this.subCategoryName = subCat.Name;
            this.items = this.$globalState.items.filter(item => item.SubCategoryId.toString() === id).sort((a, b) => a.Id - b.Id)
        }

    }
</script>

<style scoped>

</style>