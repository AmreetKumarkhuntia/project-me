export interface Project {
    title: string;
    tags: string[];
    problem: {
        title: string;
        description: string;
    };
    engineering: {
        title: string;
        description: string;
    };
    impact: {
        value: string;
        description: string;
    };
    architecture: {
        title: string;
        controlPlane: {
            label: string;
            items: string[];
        };
        dataPlane: {
            label: string;
            nodes: string[];
        };
    };
}

export const projects: Project[] = [
    {
        title: "OmniStream: Real-time Data Backbone",
        tags: ["Go", "Kafka", "Protobuf", "Kubernetes"],
        problem: {
            title: "THE PROBLEM",
            description:
                "Legacy monolithic messaging system could not handle 10x traffic spikes during promotional events, resulting in 15% message loss.",
        },
        engineering: {
            title: "THE ENGINEERING",
            description:
                "Architected a Go-based distributed message bus utilizing Kafka and custom Protobuf schemas for zero-copy serialization.",
        },
        impact: {
            value: "99.999%",
            description: "reliability during peak load",
        },
        architecture: {
            title: "System Architecture",
            controlPlane: {
                label: "// Control Plane",
                items: [
                    "Consensus management via Etcd",
                    "Custom segment-based storage engine",
                ],
            },
            dataPlane: {
                label: "// Data Plane",
                nodes: ["Node A", "Node B", "Node C"],
            },
        },
    },
];
