import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Policy {
  id: string
  title: string
  category: string
  summary: {
    en: string
    sn: string
  }
  details: {
    en: {
      objectives: string[]
      implementation: string
      impact: string
    }
    sn: {
      objectives: string[]
      implementation: string
      impact: string
    }
  }
  status: "draft" | "published" | "archived"
  createdAt: string
  updatedAt: string
}

// Add initial policies data
const initialPolicies: Policy[] = [
  {
    id: "1",
    title: "Agricultural Modernization Policy",
    category: "Agriculture",
    summary: {
      en: "Focuses on modernizing farming practices and improving food security through technology adoption.",
      sn: "Kuwedzera unyanzvi hwekurima nekushandisa nzira dzazvino dzekurima.",
    },
    details: {
      en: {
        objectives: [
          "Increase agricultural productivity through modern farming techniques",
          "Improve food security across all provinces",
          "Support small-scale farmers with technology adoption",
        ],
        implementation:
          "The policy will be implemented in phases over a 5-year period, starting with pilot programs in key agricultural regions.",
        impact: "Expected to benefit over 500,000 farmers and increase crop yields by 40%",
      },
      sn: {
        objectives: [
          "Kuwedzera zvibereko zvekurima kuburikidza nemitoro itsva",
          "Kuwedzera kudya munyika yese",
          "Kubatsira varimi vadiki kushandisa teknoroji itsva",
        ],
        implementation:
          "Hurongwa uhu huchaitwa mumakore mashanu, kutanga neminda yekuedza munzvimbo dzinonyanya kurima.",
        impact: "Hunofungidzirwa kubatsira varimi vanopfuura 500,000 nekuwedzera goho ne40%",
      },
    },
    status: "published",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-02-25T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Rural Healthcare Initiative",
    category: "Healthcare",
    summary: {
      en: "Expanding healthcare access to rural communities through mobile clinics and telemedicine.",
      sn: "Kuwedzera zvekurapwa munzvimbo dzekumamisha kuburikidza nekiriniki dzinofamba.",
    },
    details: {
      en: {
        objectives: [
          "Establish mobile clinics in remote areas",
          "Implement telemedicine services",
          "Train local healthcare workers",
        ],
        implementation:
          "Rolling out mobile clinics and telemedicine services in phases, prioritizing the most underserved areas.",
        impact: "Aims to provide healthcare access to 1 million rural residents",
      },
      sn: {
        objectives: [
          "Kuvaka zviriniki zvinofamba kunzvimbo dziri kure",
          "Kutanga masevhisi ekurapa nerunhare",
          "Kudzidzisa vashandi vezveutano venzvimbo",
        ],
        implementation:
          "Kutanga zviriniki zvinofamba nemasevhisi ekurapa nerunhare munzvimbo dzinonyanya kushaiwa rubatsiro.",
        impact: "Chinangwa chekupa rubatsiro rwezveutano kuvanhu miriyoni mumamisha",
      },
    },
    status: "published",
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-02-20T00:00:00.000Z",
  },
]

interface PolicyStore {
  policies: Policy[]
  addPolicy: (policy: Omit<Policy, "id" | "createdAt" | "updatedAt">) => void
  updatePolicy: (id: string, updates: Partial<Policy>) => void
  deletePolicy: (id: string) => void
  getPolicyById: (id: string) => Policy | undefined
  getPublishedPolicies: () => Policy[]
}

export const usePolicyStore = create<PolicyStore>()(
  persist(
    (set, get) => ({
      policies: initialPolicies, // Initialize with the mock data
      addPolicy: (newPolicy) => {
        set((state) => ({
          policies: [
            ...state.policies,
            {
              ...newPolicy,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        }))
      },
      updatePolicy: (id, updates) => {
        set((state) => ({
          policies: state.policies.map((policy) =>
            policy.id === id
              ? {
                  ...policy,
                  ...updates,
                  updatedAt: new Date().toISOString(),
                }
              : policy,
          ),
        }))
      },
      deletePolicy: (id) => {
        set((state) => ({
          policies: state.policies.filter((policy) => policy.id !== id),
        }))
      },
      getPolicyById: (id) => {
        return get().policies.find((policy) => policy.id === id)
      },
      getPublishedPolicies: () => {
        return get().policies.filter((policy) => policy.status === "published")
      },
    }),
    {
      name: "policy-storage",
    },
  ),
)

