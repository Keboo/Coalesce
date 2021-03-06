﻿using Coalesce.Domain;
using IntelliTect.Coalesce.TypeDefinition;
using IntelliTect.Coalesce.Validation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Coalesce.Web.Tests
{
    public class ViewModelTests
    {
        [Fact]
        public void ModelView()
        {
            ReflectionRepository.Global.AddAssembly<AppDbContext>();

            var person = ReflectionRepository.Global.GetClassViewModel<Person>();

            Assert.NotNull(person);

            Assert.True(person.PropertyByName(nameof(Person.Name)).IsListText);
            Assert.NotNull(person.PropertyByName(nameof(Person.LastName)).MinLength);
            Assert.Equal(3, person.PropertyByName(nameof(Person.LastName)).MinLength.Value);

            Assert.NotNull(person.PropertyByName("BirthDate"));
            Assert.NotNull(person.PropertyBySelector<Person, DateTime?>(f => f.BirthDate));
            Assert.NotNull(person.PropertyByName(nameof(Person.BirthDate)));
            Assert.True(person.PropertyByName(nameof(Person.BirthDate)).Type.IsDate);
            Assert.True(person.PropertyByName(nameof(Person.BirthDate)).Type.IsDateTime);
            Assert.False(person.PropertyByName(nameof(Person.BirthDate)).Type.IsDateTimeOffset);

            Assert.True(person.PropertyByName(nameof(Person.BirthDate)).IsDateOnly);


        }
        [Fact]
        public void ModelViewAttributes()
        {
            ReflectionRepository.Global.AddAssembly<AppDbContext>();

            var caseProduct = ReflectionRepository.Global.GetClassViewModel<CaseProduct>();
            var person = ReflectionRepository.Global.GetClassViewModel<Person>();

            Assert.NotNull(caseProduct);

            Assert.True(person.WillCreateApiController);
            Assert.True(person.WillCreateViewController);

            Assert.False(caseProduct.WillCreateViewController);
            Assert.False(caseProduct.WillCreateViewController);

        }
    }
}
