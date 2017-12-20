﻿using IntelliTect.Coalesce.CodeGeneration.Generation;
using IntelliTect.Coalesce.TypeDefinition;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace IntelliTect.Coalesce.CodeGeneration.Knockout.Generators
{
    public class Controllers : CompositeGenerator<ReflectionRepository>
    {
        public Controllers(CompositeGeneratorServices services) : base(services) { }

        public override IEnumerable<ICleaner> GetCleaners()
        {
            yield return Cleaner<DirectoryCleaner>()
                .AppendTargetPath("Api/Generated");
            yield return Cleaner<DirectoryCleaner>()
                .AppendTargetPath("Controllers/Generated");
        }

        public override IEnumerable<IGenerator> GetGenerators()
        {
            foreach (var context in this.Model.DbContexts)
            {
                var entityLookup = context.Entities.ToLookup(e => e.ClassViewModel);

                var contextTypes = context.Entities
                    .Select(e => e.ClassViewModel)
                    .Union(Model.CustomDtos.Where(dto => 
                        entityLookup.Contains(dto.DtoBaseViewModel)
                    ));
                
                foreach (var model in contextTypes)
                {
                    yield return Generator<ApiController>()
                        .WithModel(model)
                        .WithDbContext(context.ClassViewModel)
                        .AppendOutputPath($"Api/Generated/{model.Name}Controller.g.cs");

                    yield return Generator<ViewController>()
                        .WithModel(model)
                        .AppendOutputPath($"Controllers/Generated/{model.Name}Controller.g.cs");
                }
            }
        }
    }
}
