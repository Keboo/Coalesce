/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../Intellitect/intellitect.utilities.ts" />
/// <reference path="../Intellitect/intellitect.ko.utilities.ts" />
/// <reference path="./Ko.Case.ts" />

// Knockout List View Model for: Case
// Auto Generated Knockout List Bindings
// Copyright IntelliTect, 2016

var baseUrl = baseUrl || '';

module ListViewModels {
    export var areaUrl = areaUrl || ((true) ? baseUrl : baseUrl + '/');
    // Add an enum for all methods that are static and IQueryable
    export enum CaseDataSources {
            Default,
            GetAllOpenCases,
        }
    export class CaseList {
        // Query string to limit the list of items.
        public queryString: string = "";
        // Object that is passed as the query parameters.
        public query: any = null;
        // The custom code to run in order to pull the initial datasource to use for the collection that should be returned
        public listDataSource: CaseDataSources = CaseDataSources.Default;
        // String the represents the child object to load 
        public includes: string = "";
        // List of items. This the main collection.
        public items: KnockoutObservableArray<ViewModels.Case> = ko.observableArray([]);
        // Load the list.
		public load: (callback?: any) => void;
        // Deletes an item.
		public deleteItem: (item: ViewModels.Case) => void;
        // True if the collection is loading.
		public isLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Gets the count of items without getting all the items. Data put into count.
		public getCount: (callback?: any) => void;
        // The result of getCount() or the total on this page.
		public count: KnockoutObservable<number> = ko.observable(null);
        // Total count of items, even ones that are not on the page.
   		public totalCount: KnockoutObservable<number> = ko.observable(null);
        // Total page count
   		public pageCount: KnockoutObservable<number> = ko.observable(null);
        // Page number. This can be set to get a new page.
   		public page: KnockoutObservable<number> = ko.observable(1);
        // Number of items on a page.
   		public pageSize: KnockoutObservable<number> = ko.observable(10);
        // If a load failed, this is a message about why it failed.
   		public message: KnockoutObservable<string> = ko.observable(null);
        // Search criteria for the list. This can be exposed as a text box for searching.
   		public search: KnockoutObservable<string> = ko.observable("");
        // If there is another page, this is true.
        public nextPageEnabled: KnockoutComputed<boolean>
        // If there is a previous page, this is true.
        public previousPageEnabled: KnockoutComputed<boolean>;
        // Gets the next page.
        public nextPage: () => void;
        // Gets the previous page.
        public previousPage: () => void;

        // True once the data has been loaded.
		public isLoaded: KnockoutObservable<boolean> = ko.observable(false);

        // Valid values
        public assignedToValidValues: KnockoutObservableArray<any> = ko.observableArray([]);
        public loadAssignedToValidValues: (callback: any) => void;
        public reportedByValidValues: KnockoutObservableArray<any> = ko.observableArray([]);
        public loadReportedByValidValues: (callback: any) => void;
        public caseProductsValidValues: KnockoutObservableArray<any> = ko.observableArray([]);
        public loadCaseProductsValidValues: (callback: any) => void;
        public devTeamAssignedValidValues: KnockoutObservableArray<any> = ko.observableArray([]);
        public loadDevTeamAssignedValidValues: (callback: any) => void;
            // Call server method (GetAllOpenCasesCount)
        public getAllOpenCasesCount: (callback?: any) => void;
        // Result of server method (GetAllOpenCasesCount)
        public getAllOpenCasesCountResult: KnockoutObservable<any> = ko.observable();
        // True while the server method (GetAllOpenCasesCount) is being called
        public getAllOpenCasesCountIsLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Error message for server method (GetAllOpenCasesCount) if it fails.
        public getAllOpenCasesCountMessage: KnockoutObservable<string> = ko.observable(null);
        // True if the server method (GetAllOpenCasesCount) was successful.
        public getAllOpenCasesCountWasSuccessful: KnockoutObservable<boolean> = ko.observable(null);
        // Presents a series of input boxes to call the server method (GetAllOpenCasesCount)
        public getAllOpenCasesCountUi: () => void;
        
        // Call server method (GetAllOpenCases)
        public getAllOpenCases: (x: number, y: number, callback?: any) => void;
        // Result of server method (GetAllOpenCases)
        public getAllOpenCasesResult: KnockoutObservable<any> = ko.observable();
        // True while the server method (GetAllOpenCases) is being called
        public getAllOpenCasesIsLoading: KnockoutObservable<boolean> = ko.observable(false);
        // Error message for server method (GetAllOpenCases) if it fails.
        public getAllOpenCasesMessage: KnockoutObservable<string> = ko.observable(null);
        // True if the server method (GetAllOpenCases) was successful.
        public getAllOpenCasesWasSuccessful: KnockoutObservable<boolean> = ko.observable(null);
        // Presents a series of input boxes to call the server method (GetAllOpenCases)
        public getAllOpenCasesUi: () => void;
        public getAllOpenCasesWithArgs: (args: CaseList.GetAllOpenCasesArgs) => void;
        
        public getAllOpenCasesArgs = new CaseList.GetAllOpenCasesArgs(); 
        
        constructor() {
            var self = this; 
            var searchTimeout: number = 0;

            // Load the collection
            self.load = function(callback?: any) {
                intellitect.utilities.showBusy();
                if(self.query) {
                    self.queryString = $.param(self.query);
                }
                self.isLoading(true);
                $.ajax({ method: "GET",
                         url: areaUrl + "api/Case/List?includes=" + self.includes + "&page=" + self.page()
                                + "&pageSize=" + self.pageSize() + "&search=" + self.search()
                                + "&listDataSource=" + CaseDataSources[self.listDataSource] + "&" + self.queryString,
                        xhrFields: { withCredentials: true } })
                .done(function(data) {
                    if (data.WasSuccessful){
                        self.items.removeAll();
                        for (var i in data.List) {
                            var model = new ViewModels.Case(data.List[i]);
                            model.includes = self.includes;
                            model.onDelete(itemDeleted);
                            self.items.push(model);
                        }
                        self.count(data.List.length);
                        self.totalCount(data.TotalCount);
                        self.pageCount(data.PageCount);
                        self.page(data.Page);
                        self.message(data.Message)
                        self.isLoaded(true);
                        if ($.isFunction(callback)) callback(self);
                    }else{
                        self.message(data.Message);
                        self.isLoaded(false);
                    }
                })
                .fail(function() {
                    alert("Could not get list of Case items.");
                })
                .always(function() {
                    intellitect.utilities.hideBusy();
                    self.isLoading(false);
                });
            };

            // Paging
            self.nextPage = function() {
                if (self.nextPageEnabled()) {
                    self.page(self.page() + 1);
                    self.load();
                }
            }
            self.nextPageEnabled = ko.computed(function() {
                if (self.page() < self.pageCount()) return true;
                return false;
            })
            self.previousPage = function() {
                if (self.previousPageEnabled()) {
                    self.page(self.page() - 1);
                    self.load();
                }
            }
            self.previousPageEnabled = ko.computed(function() {
                if (self.page() > 1) return true;
                return false;
            })


            // Load the count
            self.getCount = function(callback?: any) {
                intellitect.utilities.showBusy();
                if (self.query) {
                    self.queryString = $.param(self.query);
                }
                $.ajax({ method: "GET",
                         url: areaUrl + "api/Case/count?" + "listDataSource=" + CaseDataSources[self.listDataSource] + "&" + self.queryString,
                         xhrFields: { withCredentials: true } })
                .done(function(data) {
                    self.count(data);
                    if ($.isFunction(callback)) callback();
                })
                .fail(function() {
                    alert("Could not get count of Case items.");
                })
                .always(function() {
                    intellitect.utilities.hideBusy();
                });
            };

            // Callback for when an item is deleted
            function itemDeleted(item) {
                self.items.remove(item);
            }

            // Deletes an item and removes it from the array.
            self.deleteItem = function(item: ViewModels.Case)
            {
                item.deleteItem();
            };

            self.pageSize.subscribe(function () {
                if (self.isLoaded()){
                    self.load();
                }
            });
            self.search.subscribe(function () {
                if (searchTimeout) {
                    clearTimeout(searchTimeout);
                }
                searchTimeout = setTimeout(function() {
                    searchTimeout = 0;
                    self.load();
                }, 300);
            });

    // Method Implementations

            self.getAllOpenCasesCount = function(callback?: any){
                self.getAllOpenCasesCountIsLoading(true);
                $.ajax({ method: "POST",
                         url: areaUrl + "api/Case/GetAllOpenCasesCount",
                         data: {

                    },
                         xhrFields: { withCredentials: true } })
				.done(function(data) {
					if (data.WasSuccessful) {
						self.getAllOpenCasesCountMessage('');
						self.getAllOpenCasesCountWasSuccessful(true);
						self.getAllOpenCasesCountResult(data.Object);
                        self.load(callback);
					} else {
						self.getAllOpenCasesCountWasSuccessful(false);
						self.getAllOpenCasesCountMessage(data.Message);
					}
				})
				.fail(function() {
					alert("Could not call method getAllOpenCasesCount");
				})
				.always(function() {
                    self.getAllOpenCasesCountIsLoading(false);
				});
            }

            self.getAllOpenCasesCountUi = function() {
                self.getAllOpenCasesCount();
            }
            

            

            self.getAllOpenCases = function(x: number, y: number, callback?: any){
                self.getAllOpenCasesIsLoading(true);
                $.ajax({ method: "POST",
                         url: areaUrl + "api/Case/GetAllOpenCases",
                         data: {
                        x: x, 
                        y: y
                    },
                         xhrFields: { withCredentials: true } })
				.done(function(data) {
					if (data.WasSuccessful) {
						self.getAllOpenCasesMessage('');
						self.getAllOpenCasesWasSuccessful(true);
						self.getAllOpenCasesResult(data.Object);
                        self.load(callback);
					} else {
						self.getAllOpenCasesWasSuccessful(false);
						self.getAllOpenCasesMessage(data.Message);
					}
				})
				.fail(function() {
					alert("Could not call method getAllOpenCases");
				})
				.always(function() {
                    self.getAllOpenCasesIsLoading(false);
				});
            }

            self.getAllOpenCasesUi = function() {
                var x: number = parseFloat(prompt('X'));
                var y: number = parseFloat(prompt('Y'));
                self.getAllOpenCases(x, y);
            }
            
            self.getAllOpenCasesWithArgs = function(args: CaseList.GetAllOpenCasesArgs) {
                if (!args) args = self.getAllOpenCasesArgs;
                self.getAllOpenCases(args.x(), args.y());
                self.getAllOpenCases(args.x(), args.y());
            }

            
        }
    }

    export namespace CaseList {
        // Classes for use in method calls to support data binding for input for arguments
        export class GetAllOpenCasesArgs {
            public x = ko.observable(null);
            public y = ko.observable(null);
        }
    }
}