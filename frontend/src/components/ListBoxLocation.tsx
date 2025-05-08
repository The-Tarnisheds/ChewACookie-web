import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useEffect } from 'react'


interface Region {
  id_region: number
  nombre_region: string
}

interface Comuna {
  id_comuna: number
  nombre_comuna: string
  id_region: number
}

export default function Example() {
  const [regions, setRegions] = useState<Region[]>([])
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [comunas, setComunas] = useState<Comuna[]>([])
  const [selectedComuna, setSelectedComuna] = useState<Comuna | null>(null)


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users/location')
        const data = await response.json()
        const regionesAdaptadas = data.data.regiones.map((region: any) => ({
        id_region: region.id_region,
        nombre_region: region.nombre_region
      }))
      setRegions(regionesAdaptadas)

      const comunasAdaptadas = data.data.comunas.map((comuna: any) => ({
        id_comuna: comuna.id_comuna,
        nombre_comuna: comuna.nombre_comuna,
        id_region: comuna.id_region
      }))
      setComunas(comunasAdaptadas)

    } catch (error) {
      console.error("Error al cargar regiones y comunas:", error)
    }
  }

  fetchLocations()
}, [])

const comunasFiltradas = selectedRegion
  ? comunas.filter(comuna => comuna.id_region === selectedRegion.id_region)
  : []

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-black text-sm font-medium">Región</label>
        <Listbox value={selectedRegion} onChange={setSelectedRegion}>
          <div className="relative">
            <ListboxButton className="relative w-full px-4 py-2 text-start rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17] appearance-none">
              {selectedRegion ? selectedRegion.nombre_region : 'Selecciona una Región'}
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 black"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-beige text-black border border-gray-300 shadow-md">
              {regions.map((region) => (
                <ListboxOption
                  key={region.id_region}
                  value={region}
                  className="w-full px-4 py-2 hover:bg-[#e4d2be] cursor-pointer"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                  <div className="text-sm/6 text-black">{region.nombre_region}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>

      <div className="space-y-2">
        <label className="block text-black text-sm font-medium">Comuna</label>
        <Listbox value={selectedComuna} onChange={setSelectedComuna}>
          <div className="relative">
            <ListboxButton className="relative w-full px-4 py-2 text-start rounded-md bg-beige text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#592d17] appearance-none">
              {selectedComuna ? selectedComuna.nombre_comuna : 'Selecciona una Región'}
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 black"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-beige text-black border border-gray-300 shadow-md">
              {comunasFiltradas.map((comuna) => (
                <ListboxOption
                  key={comuna.id_comuna}
                  value={comuna}
                  className="w-full px-4 py-2 hover:bg-[#e4d2be] cursor-pointer"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-selected:visible" />
                  <div className="text-sm/6 text-black">{comuna.nombre_comuna}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

  