﻿using IntelliTect.Coalesce.TypeDefinition;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using Xunit.Abstractions;

namespace IntelliTect.Coalesce.Tests.Util
{
    public class ClassViewModelData : IXunitSerializable
    {
        public Type TargetType { get; private set; }
        public Type ViewModelType { get; private set; }

        public ClassViewModel ClassViewModel { get; private set; }

        public ClassViewModelData()
        {
        }

        public ClassViewModelData(Type targetType, Type viewModelType) : this()
        {
            TargetType = targetType;
            ViewModelType = viewModelType;
            SetupProps();
        }

        private void SetupProps()
        {
            if (ViewModelType == typeof(ReflectionClassViewModel))
            {
                ClassViewModel = ReflectionRepositoryFactory.Reflection.GetClassViewModel(TargetType);
            }
            else if (ViewModelType == typeof(SymbolClassViewModel))
            {
                var locatedSymbol = ReflectionRepositoryFactory.Symbols
                    .Where(symbol => symbol.Name == TargetType.Name)
                    .SingleOrDefault();

                if (locatedSymbol == null)
                {
                    throw new ArgumentException($"Class {TargetType} not found in any C# embedded resources.");
                }

                ClassViewModel = ReflectionRepositoryFactory.Symbol.GetClassViewModel(TargetType);
            }
        }

        public void Deserialize(IXunitSerializationInfo info)
        {
            var targetType = info.GetValue<string>(nameof(TargetType));
            var viewModelType = info.GetValue<string>(nameof(ViewModelType));

            TargetType = Type.GetType(targetType);

            switch (viewModelType)
            {
                case nameof(ReflectionClassViewModel):
                    ViewModelType = typeof(ReflectionClassViewModel);
                    break;

                case nameof(SymbolClassViewModel):
                    ViewModelType = typeof(SymbolClassViewModel);
                    break;

                default:
                    throw new InvalidOperationException($"Unknown type {viewModelType}");
            }

            SetupProps();
        }

        public void Serialize(IXunitSerializationInfo info)
        {
            info.AddValue(nameof(TargetType), TargetType.FullName);
            info.AddValue(nameof(ViewModelType), ViewModelType.Name);
        }
        


        public static implicit operator ClassViewModel(ClassViewModelData self)
            => self.ClassViewModel;

        public override string ToString() =>
            $"({(ViewModelType.Name.StartsWith("Sym") ? "Symbol" : "Reflect")}) {TargetType.Name}";
    }
}
