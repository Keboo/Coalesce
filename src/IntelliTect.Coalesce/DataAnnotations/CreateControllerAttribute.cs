﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IntelliTect.Coalesce.DataAnnotations
{
    /// <summary>
    /// Allows specifying the types of controllers to create. Not including will create all.
    /// </summary>
    [System.AttributeUsage(System.AttributeTargets.Class)]
    public class CreateControllerAttribute : System.Attribute
    {
        public bool WillCreateView { get; set; }
        public bool WillCreateApi { get; set; }
        public CreateControllerAttribute(bool willCreateView = true, bool willCreateApi = true)
        {
            WillCreateView = willCreateView;
            WillCreateApi = willCreateApi;
        }
    }
}
