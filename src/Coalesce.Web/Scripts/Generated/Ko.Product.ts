
/// <reference path="../coalesce.dependencies.d.ts" />

// Knockout View Model for: Product
// Auto Generated by IntelliTect.Coalesce

module ViewModels {

	export class Product extends Coalesce.BaseViewModel<Product>
    {
        protected modelName = "Product";
        protected primaryKeyName = "productId";
        protected modelDisplayName = "Product";

        protected apiController = "/Product";
        protected viewController = "/Product";
    
        /** 
            The enumeration of all possible values of this.dataSource.
        */
        public dataSources: typeof ListViewModels.ProductDataSources = ListViewModels.ProductDataSources;

        /**
            The data source on the server to use when retrieving the object.
            Valid values are in this.dataSources.
        */
        public dataSource: ListViewModels.ProductDataSources = ListViewModels.ProductDataSources.Default;

        /** Behavioral configuration for all instances of Product. Can be overidden on each instance via instance.coalesceConfig. */
        public static coalesceConfig: Coalesce.ViewModelConfiguration<Product>
            = new Coalesce.ViewModelConfiguration<Product>(Coalesce.GlobalConfiguration.viewModel);

        /** Behavioral configuration for the current Product instance. */
        public coalesceConfig: Coalesce.ViewModelConfiguration<Product>
            = new Coalesce.ViewModelConfiguration<Product>(Product.coalesceConfig);
    

        public productId: KnockoutObservable<number> = ko.observable(null);
        public name: KnockoutObservable<string> = ko.observable(null);

       
        






        /** 
            Load the ViewModel object from the DTO. 
            @param force: Will override the check against isLoading that is done to prevent recursion. False is default.
            @param allowCollectionDeletes: Set true when entire collections are loaded. True is the default. In some cases only a partial collection is returned, set to false to only add/update collections.
        */
        public loadFromDto = (data: any, force: boolean = false, allowCollectionDeletes: boolean = true) => {
            if (!data || (!force && this.isLoading())) return;
            this.isLoading(true);
            // Set the ID 
            this.myId = data.productId;
            this.productId(data.productId);
            // Load the lists of other objects
            // Objects are loaded first so that they are available when the IDs get loaded.
            // This handles the issue with populating select lists with correct data because we now have the object.

            // The rest of the objects are loaded now.
            this.name(data.name);
            if (this.coalesceConfig.onLoadFromDto()){
                this.coalesceConfig.onLoadFromDto()(this as any);
            }
            this.isLoading(false);
            this.isDirty(false);
    
            if (this.coalesceConfig.validateOnLoadFromDto()) this.validate();
        };

        /** Save the object into a DTO */
        public saveToDto = (): any => {
            var dto: any = {};
            dto.productId = this.productId();

            dto.name = this.name();

            return dto;
        }
        
        public setupValidation = () => {
            if (this.errors !== null) return;
            this.errors = ko.validation.group([
            ]);
            this.warnings = ko.validation.group([
            ]);
        }
    
        // Computed Observable for edit URL
        public editUrl = ko.pureComputed(() => {
            return this.coalesceConfig.baseViewUrl() + this.viewController + "/CreateEdit?id=" + this.productId();
        });

        constructor(newItem?: any, parent?: any){
            super();
            var self = this;
            self.parent = parent;
            self.myId;

            if (this.coalesceConfig.setupValidationAutomatically.peek()) {
                this.setupValidation();
            }

            // Create computeds for display for objects

    



            // Load all child objects that are not loaded.
            self.loadChildren = function(callback) {
                var loadingCount = 0;
                if (loadingCount == 0 && $.isFunction(callback)){
                    callback();
                }
            };

            // This stuff needs to be done after everything else is set up.
            // Complex Type Observables

            self.name.subscribe(self.autoSave);
        
            if (newItem) {
                if ($.isNumeric(newItem)) self.load(newItem);
                else self.loadFromDto(newItem, true);
            }
        }
    }





    export namespace Product {

        // Classes for use in method calls to support data binding for input for arguments
    }
}