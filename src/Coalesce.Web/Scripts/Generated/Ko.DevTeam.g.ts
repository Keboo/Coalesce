
/// <reference path="../coalesce.dependencies.d.ts" />

module ViewModels {
    // *** External Type DevTeam
    export class DevTeam
    {
        public myId: any = 0;

        // Observables
        public devTeamId: KnockoutObservable<number> = ko.observable(null);
        public name: KnockoutObservable<string> = ko.observable(null);
        // Loads this object from a data transfer object received from the server.
        public parent: any;
        public parentCollection: any;

        public loadFromDto = (data: any) => {
            if (!data) return;
            // Set the ID
            this.myId = data.devTeamId;

            // Load the properties.
            this.devTeamId(data.devTeamId);
            this.name(data.name);

        };

                /** Saves this object into a data transfer object to send to the server. */
        public saveToDto = (): any => {
            var dto: any = {};
            dto.devTeamId = this.devTeamId();
            
            dto.name = this.name();
            
            return dto;
        }


        constructor(newItem?: any, parent?: any){
            this.parent = parent;
            // Load the object

            if (newItem) {
                this.loadFromDto(newItem);
            }
        }
    }
}
