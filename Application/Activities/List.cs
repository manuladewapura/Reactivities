using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> { }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;
                this.context = context;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await this.context.Activities.ToListAsync();
                return this.mapper.Map<List<Activity>, List<ActivityDto>>(activities);
            }
        }
    }
}